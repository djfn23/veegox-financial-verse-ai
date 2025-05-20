
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title GovernanceVEX
 * @dev gVEX is the governance token of the Veegox ecosystem
 * It is non-transferable and can only be obtained through staking VEX
 */
contract GovernanceVEX is ERC20, Ownable {
    using SafeMath for uint256;
    
    // VeegoxStaking contract address
    address public stakingContract;
    
    // DAO contract address
    address public daoContract;
    
    // Block transfers except for authorized contracts
    bool private _transfersAllowed = false;
    
    // Events
    event StakingContractUpdated(address indexed newStakingContract);
    event DAOContractUpdated(address indexed newDAOContract);
    
    // Custom error for unauthorized transfer attempts
    error TransferNotAllowed();

    constructor(address initialOwner) ERC20("Governance Veegox", "gVEX") Ownable(initialOwner) {}
    
    /**
     * @dev Sets the staking contract address
     * @param _stakingContract New staking contract address
     */
    function setStakingContract(address _stakingContract) external onlyOwner {
        require(_stakingContract != address(0), "gVEX: Staking contract cannot be zero address");
        stakingContract = _stakingContract;
        emit StakingContractUpdated(_stakingContract);
    }
    
    /**
     * @dev Sets the DAO contract address
     * @param _daoContract New DAO contract address
     */
    function setDAOContract(address _daoContract) external onlyOwner {
        require(_daoContract != address(0), "gVEX: DAO contract cannot be zero address");
        daoContract = _daoContract;
        emit DAOContractUpdated(_daoContract);
    }
    
    /**
     * @dev Mints gVEX tokens - only callable by staking contract
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        require(msg.sender == stakingContract, "gVEX: Only staking contract can mint");
        _mint(to, amount);
    }
    
    /**
     * @dev Burns gVEX tokens - only callable by staking contract
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burn(address from, uint256 amount) external {
        require(msg.sender == stakingContract, "gVEX: Only staking contract can burn");
        _burn(from, amount);
    }
    
    /**
     * @dev Overrides ERC20 _transfer to restrict transfers
     * @param from Address tokens are transferred from
     * @param to Address tokens are transferred to  
     * @param amount Amount of tokens to transfer
     */
    function _transfer(address from, address to, uint256 amount) internal override {
        // Only allow transfers from/to approved contracts
        if (!_isAuthorizedTransfer(from, to)) {
            revert TransferNotAllowed();
        }
        super._transfer(from, to, amount);
    }
    
    /**
     * @dev Checks if a transfer is authorized
     * @param from Source address
     * @param to Destination address
     * @return bool True if transfer is allowed
     */
    function _isAuthorizedTransfer(address from, address to) internal view returns (bool) {
        // Allow transfers involving staking or DAO contracts
        return (from == stakingContract || to == stakingContract ||
                from == daoContract || to == daoContract ||
                from == owner() || to == owner());
    }
    
    /**
     * @dev Gets the governance voting power for an address
     * Voting power can include time-weighted logic if implemented
     * @param account Address to check
     * @return Power Voting power as uint256
     */
    function getVotingPower(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
