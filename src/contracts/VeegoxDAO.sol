
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./GovernanceVEX.sol";

/**
 * @title VeegoxDAO
 * @dev Governance contract for the Veegox ecosystem
 */
contract VeegoxDAO is Ownable {
    using SafeMath for uint256;
    
    // GovernanceVEX token used for voting
    GovernanceVEX public gVexToken;
    
    // Proposal status
    enum ProposalStatus {
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Executed
    }
    
    // Vote type
    enum VoteType {
        Against,
        For,
        Abstain
    }
    
    // Proposal structure
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        bytes callData;         // Call data for execution
        address target;         // Target contract to call
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        bool canceled;
        mapping(address => Vote) votes;
    }
    
    // Vote record
    struct Vote {
        VoteType voteType;
        uint256 weight;
        bool hasVoted;
    }
    
    // Proposal count
    uint256 public proposalCount;
    
    // Mapping from proposal ID to proposal
    mapping(uint256 => Proposal) public proposals;
    
    // Governance parameters
    uint256 public proposalThreshold;     // Min gVEX to submit proposal
    uint256 public votingPeriod;          // Voting duration in seconds
    uint256 public executionDelay;        // Delay before execution in seconds
    uint256 public quorumPercentage;      // Required participation in basis points
    uint256 public majorityPercentage;    // Required majority in basis points
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 startTime,
        uint256 endTime
    );
    event ProposalCanceled(uint256 indexed proposalId);
    event ProposalExecuted(uint256 indexed proposalId);
    event VoteCast(address indexed voter, uint256 indexed proposalId, uint8 voteType, uint256 weight);
    event GovernanceParamsUpdated(
        uint256 proposalThreshold,
        uint256 votingPeriod,
        uint256 executionDelay,
        uint256 quorumPercentage,
        uint256 majorityPercentage
    );
    
    constructor(
        address initialOwner,
        address _gVexToken
    ) Ownable(initialOwner) {
        require(_gVexToken != address(0), "DAO: gVEX cannot be zero address");
        gVexToken = GovernanceVEX(_gVexToken);
        
        // Set default parameters
        proposalThreshold = 100000 * 10**18;  // 100,000 gVEX
        votingPeriod = 3 days;                // 3 days voting period
        executionDelay = 2 days;              // 2 days delay
        quorumPercentage = 1000;              // 10% quorum
        majorityPercentage = 5000;            // 50% majority
    }
    
    /**
     * @dev Creates a new proposal
     * @param title Proposal title
     * @param description Proposal description
     * @param target Contract to call if proposal passes
     * @param callData Call data for execution
     */
    function createProposal(
        string memory title,
        string memory description,
        address target,
        bytes memory callData
    ) external {
        // Check if proposer has enough gVEX
        require(gVexToken.balanceOf(msg.sender) >= proposalThreshold, "DAO: Below proposal threshold");
        
        // Create proposal
        uint256 proposalId = ++proposalCount;
        Proposal storage newProposal = proposals[proposalId];
        
        newProposal.id = proposalId;
        newProposal.proposer = msg.sender;
        newProposal.title = title;
        newProposal.description = description;
        newProposal.target = target;
        newProposal.callData = callData;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + votingPeriod;
        newProposal.executed = false;
        newProposal.canceled = false;
        
        emit ProposalCreated(proposalId, msg.sender, title, newProposal.startTime, newProposal.endTime);
    }
    
    /**
     * @dev Cancels a proposal (proposer only)
     * @param proposalId ID of the proposal to cancel
     */
    function cancelProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        
        require(proposal.proposer == msg.sender, "DAO: Not the proposer");
        require(block.timestamp < proposal.endTime, "DAO: Voting ended");
        require(!proposal.executed, "DAO: Already executed");
        require(!proposal.canceled, "DAO: Already canceled");
        
        proposal.canceled = true;
        
        emit ProposalCanceled(proposalId);
    }
    
    /**
     * @dev Casts a vote on a proposal
     * @param proposalId ID of the proposal to vote on
     * @param voteType Type of vote (0=Against, 1=For, 2=Abstain)
     */
    function castVote(uint256 proposalId, uint8 voteType) external {
        require(voteType <= uint8(VoteType.Abstain), "DAO: Invalid vote type");
        
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.startTime, "DAO: Voting not started");
        require(block.timestamp < proposal.endTime, "DAO: Voting ended");
        require(!proposal.executed, "DAO: Already executed");
        require(!proposal.canceled, "DAO: Proposal canceled");
        require(!proposal.votes[msg.sender].hasVoted, "DAO: Already voted");
        
        uint256 weight = gVexToken.getVotingPower(msg.sender);
        require(weight > 0, "DAO: No voting power");
        
        // Record vote
        proposal.votes[msg.sender] = Vote({
            voteType: VoteType(voteType),
            weight: weight,
            hasVoted: true
        });
        
        // Update vote counts
        if (voteType == uint8(VoteType.Against)) {
            proposal.againstVotes = proposal.againstVotes.add(weight);
        } else if (voteType == uint8(VoteType.For)) {
            proposal.forVotes = proposal.forVotes.add(weight);
        } else if (voteType == uint8(VoteType.Abstain)) {
            proposal.abstainVotes = proposal.abstainVotes.add(weight);
        }
        
        emit VoteCast(msg.sender, proposalId, voteType, weight);
    }
    
    /**
     * @dev Executes a successful proposal after delay
     * @param proposalId ID of the proposal to execute
     */
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.endTime + executionDelay, "DAO: Execution delay not met");
        require(!proposal.executed, "DAO: Already executed");
        require(!proposal.canceled, "DAO: Proposal canceled");
        require(isProposalSucceeded(proposalId), "DAO: Proposal not succeeded");
        
        proposal.executed = true;
        
        // Execute proposal call
        (bool success, ) = proposal.target.call(proposal.callData);
        require(success, "DAO: Execution failed");
        
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Checks if a proposal has succeeded
     * @param proposalId ID of the proposal to check
     * @return success Whether the proposal succeeded
     */
    function isProposalSucceeded(uint256 proposalId) public view returns (bool) {
        Proposal storage proposal = proposals[proposalId];
        
        // If canceled or not ended yet, not succeeded
        if (proposal.canceled || block.timestamp < proposal.endTime) {
            return false;
        }
        
        // Check quorum
        uint256 totalVotes = proposal.forVotes.add(proposal.againstVotes).add(proposal.abstainVotes);
        uint256 totalSupply = gVexToken.totalSupply();
        
        // Must have at least quorum participation
        if (totalVotes.mul(10000).div(totalSupply) < quorumPercentage) {
            return false;
        }
        
        // Check majority
        uint256 votedTotal = proposal.forVotes.add(proposal.againstVotes);
        return votedTotal > 0 && proposal.forVotes.mul(10000).div(votedTotal) >= majorityPercentage;
    }
    
    /**
     * @dev Gets the current status of a proposal
     * @param proposalId ID of the proposal to check
     * @return status Current status of the proposal
     */
    function getProposalStatus(uint256 proposalId) external view returns (ProposalStatus) {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.canceled) {
            return ProposalStatus.Canceled;
        }
        
        if (proposal.executed) {
            return ProposalStatus.Executed;
        }
        
        if (block.timestamp <= proposal.endTime) {
            return ProposalStatus.Active;
        }
        
        if (isProposalSucceeded(proposalId)) {
            return ProposalStatus.Succeeded;
        }
        
        return ProposalStatus.Defeated;
    }
    
    /**
     * @dev Updates governance parameters
     * @param _proposalThreshold New proposal threshold
     * @param _votingPeriod New voting period
     * @param _executionDelay New execution delay
     * @param _quorumPercentage New quorum percentage
     * @param _majorityPercentage New majority percentage
     */
    function updateGovernanceParams(
        uint256 _proposalThreshold,
        uint256 _votingPeriod,
        uint256 _executionDelay,
        uint256 _quorumPercentage,
        uint256 _majorityPercentage
    ) external onlyOwner {
        require(_votingPeriod >= 1 days, "DAO: Voting period too short");
        require(_quorumPercentage <= 5000, "DAO: Quorum too high");
        require(_majorityPercentage <= 10000, "DAO: Invalid majority");
        
        proposalThreshold = _proposalThreshold;
        votingPeriod = _votingPeriod;
        executionDelay = _executionDelay;
        quorumPercentage = _quorumPercentage;
        majorityPercentage = _majorityPercentage;
        
        emit GovernanceParamsUpdated(
            _proposalThreshold,
            _votingPeriod,
            _executionDelay,
            _quorumPercentage,
            _majorityPercentage
        );
    }
    
    /**
     * @dev Gets vote details for a voter on a proposal
     * @param proposalId ID of the proposal
     * @param voter Address of the voter
     * @return hasVoted Whether the address has voted
     * @return voteType Type of vote cast
     * @return weight Weight of the vote
     */
    function getVoteInfo(uint256 proposalId, address voter) external view returns (
        bool hasVoted,
        uint8 voteType,
        uint256 weight
    ) {
        Vote storage vote = proposals[proposalId].votes[voter];
        return (vote.hasVoted, uint8(vote.voteType), vote.weight);
    }
}
