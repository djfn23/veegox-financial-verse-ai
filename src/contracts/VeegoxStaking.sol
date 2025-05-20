
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./GovernanceVEX.sol";

/**
 * @title VeegoxStaking
 * @dev Contract for staking VEX tokens with both flexible and locked staking options
 */
contract VeegoxStaking is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    // Token contracts
    IERC20 public vexToken;
    GovernanceVEX public gVexToken;
    
    // Treasury contract for receiving fees
    address public treasury;
    
    // Base APY for flexible staking (in basis points, 500 = 5%)
    uint256 public flexibleBaseAPY = 500;
    
    // Staking pools for different lock periods (in days)
    // The mapping key is the lock period, the value is the APY multiplier (in basis points)
    mapping(uint256 => uint256) public lockPeriods;
    
    // User stakes
    struct Stake {
        uint256 amount;      // Amount of VEX staked
        uint256 startTime;   // When the stake was created
        uint256 endTime;     // When the locked stake ends (0 for flexible)
        uint256 lastClaim;   // Last time rewards were claimed
        bool isFlexible;     // Whether this is a flexible or locked stake
    }
    
    // Mapping from user to stakes
    mapping(address => Stake[]) public userStakes;
    
    // Total staked amount
    uint256 public totalStaked;
    
    // Events
    event Staked(address indexed user, uint256 amount, uint256 endTime, bool isFlexible);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event RewardClaimed(address indexed user, uint256 reward);
    event APYUpdated(uint256 newBaseAPY);
    event LockPeriodAdded(uint256 days_, uint256 multiplier);
    event LockPeriodRemoved(uint256 days_);
    
    constructor(
        address initialOwner,
        address _vexToken,
        address _gVexToken,
        address _treasury
    ) Ownable(initialOwner) {
        require(_vexToken != address(0), "Staking: VEX token cannot be zero address");
        require(_gVexToken != address(0), "Staking: gVEX token cannot be zero address");
        require(_treasury != address(0), "Staking: Treasury cannot be zero address");
        
        vexToken = IERC20(_vexToken);
        gVexToken = GovernanceVEX(_gVexToken);
        treasury = _treasury;
        
        // Initialize lock periods
        // 30 days - 1.5x APY
        lockPeriods[30] = 150;
        // 90 days - 2x APY
        lockPeriods[90] = 200;
        // 180 days - 2.5x APY
        lockPeriods[180] = 250;
        // 365 days - 3x APY
        lockPeriods[365] = 300;
    }
    
    /**
     * @dev Stakes VEX tokens in flexible pool
     * @param amount Amount of VEX to stake
     */
    function stakeFlexible(uint256 amount) external nonReentrant {
        require(amount > 0, "Staking: Amount must be greater than 0");
        
        // Transfer VEX from user to contract
        require(vexToken.transferFrom(msg.sender, address(this), amount), "Staking: Transfer failed");
        
        // Create flexible stake
        Stake memory newStake = Stake({
            amount: amount,
            startTime: block.timestamp,
            endTime: 0, // 0 for flexible stake
            lastClaim: block.timestamp,
            isFlexible: true
        });
        
        userStakes[msg.sender].push(newStake);
        totalStaked = totalStaked.add(amount);
        
        emit Staked(msg.sender, amount, 0, true);
    }
    
    /**
     * @dev Stakes VEX tokens in locked pool
     * @param amount Amount of VEX to stake
     * @param lockDays Number of days to lock the stake (must be from predefined options)
     */
    function stakeLocked(uint256 amount, uint256 lockDays) external nonReentrant {
        require(amount > 0, "Staking: Amount must be greater than 0");
        require(lockPeriods[lockDays] > 0, "Staking: Invalid lock period");
        
        // Transfer VEX from user to contract
        require(vexToken.transferFrom(msg.sender, address(this), amount), "Staking: Transfer failed");
        
        // Calculate end time
        uint256 endTime = block.timestamp + (lockDays * 1 days);
        
        // Create locked stake
        Stake memory newStake = Stake({
            amount: amount,
            startTime: block.timestamp,
            endTime: endTime,
            lastClaim: block.timestamp,
            isFlexible: false
        });
        
        userStakes[msg.sender].push(newStake);
        totalStaked = totalStaked.add(amount);
        
        // Mint gVEX tokens based on locked amount and period
        uint256 gVexAmount = _calculateGVEXAmount(amount, lockDays);
        gVexToken.mint(msg.sender, gVexAmount);
        
        emit Staked(msg.sender, amount, endTime, false);
    }
    
    /**
     * @dev Unstakes VEX tokens from flexible stake
     * @param stakeIndex Index of the stake in the user's stake array
     */
    function unstakeFlexible(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Staking: Invalid stake index");
        
        Stake storage stake = userStakes[msg.sender][stakeIndex];
        require(stake.isFlexible, "Staking: Not a flexible stake");
        
        // Calculate pending rewards
        uint256 pendingReward = _calculateReward(stake);
        
        // Update total staked
        totalStaked = totalStaked.sub(stake.amount);
        
        // Transfer original stake back to user
        require(vexToken.transfer(msg.sender, stake.amount), "Staking: Transfer failed");
        
        // Send reward from treasury
        if (pendingReward > 0) {
            require(vexToken.transferFrom(treasury, msg.sender, pendingReward), "Staking: Reward transfer failed");
        }
        
        // Remove stake by replacing with last element and popping
        if (stakeIndex < userStakes[msg.sender].length - 1) {
            userStakes[msg.sender][stakeIndex] = userStakes[msg.sender][userStakes[msg.sender].length - 1];
        }
        userStakes[msg.sender].pop();
        
        emit Unstaked(msg.sender, stake.amount, pendingReward);
    }
    
    /**
     * @dev Unstakes VEX tokens from locked stake after lock period ends
     * @param stakeIndex Index of the stake in the user's stake array
     */
    function unstakeLocked(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Staking: Invalid stake index");
        
        Stake storage stake = userStakes[msg.sender][stakeIndex];
        require(!stake.isFlexible, "Staking: Not a locked stake");
        require(block.timestamp >= stake.endTime, "Staking: Lock period not ended");
        
        // Calculate pending rewards
        uint256 pendingReward = _calculateReward(stake);
        
        // Update total staked
        totalStaked = totalStaked.sub(stake.amount);
        
        // Calculate gVEX to burn
        uint256 lockDays = (stake.endTime - stake.startTime) / 1 days;
        uint256 gVexAmount = _calculateGVEXAmount(stake.amount, lockDays);
        
        // Burn gVEX tokens
        gVexToken.burn(msg.sender, gVexAmount);
        
        // Transfer original stake back to user
        require(vexToken.transfer(msg.sender, stake.amount), "Staking: Transfer failed");
        
        // Send reward from treasury
        if (pendingReward > 0) {
            require(vexToken.transferFrom(treasury, msg.sender, pendingReward), "Staking: Reward transfer failed");
        }
        
        // Remove stake by replacing with last element and popping
        if (stakeIndex < userStakes[msg.sender].length - 1) {
            userStakes[msg.sender][stakeIndex] = userStakes[msg.sender][userStakes[msg.sender].length - 1];
        }
        userStakes[msg.sender].pop();
        
        emit Unstaked(msg.sender, stake.amount, pendingReward);
    }
    
    /**
     * @dev Claims rewards from a stake without unstaking
     * @param stakeIndex Index of the stake in the user's stake array
     */
    function claimRewards(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Staking: Invalid stake index");
        
        Stake storage stake = userStakes[msg.sender][stakeIndex];
        
        // Calculate pending rewards
        uint256 pendingReward = _calculateReward(stake);
        require(pendingReward > 0, "Staking: No rewards to claim");
        
        // Update last claim time
        stake.lastClaim = block.timestamp;
        
        // Send reward from treasury
        require(vexToken.transferFrom(treasury, msg.sender, pendingReward), "Staking: Reward transfer failed");
        
        emit RewardClaimed(msg.sender, pendingReward);
    }
    
    /**
     * @dev Calculates rewards for a stake
     * @param stake Stake to calculate rewards for
     * @return reward Amount of VEX reward
     */
    function _calculateReward(Stake storage stake) internal view returns (uint256) {
        uint256 timeStaked;
        
        if (stake.isFlexible) {
            timeStaked = block.timestamp - stake.lastClaim;
        } else {
            // For locked stakes, if still locked, calculate up to now
            // If unlocked, calculate up to end time
            if (block.timestamp < stake.endTime) {
                timeStaked = block.timestamp - stake.lastClaim;
            } else {
                timeStaked = stake.endTime - stake.lastClaim;
            }
        }
        
        // If no time has passed, no rewards
        if (timeStaked == 0) {
            return 0;
        }
        
        // Calculate APY based on stake type
        uint256 apy;
        
        if (stake.isFlexible) {
            apy = flexibleBaseAPY;
        } else {
            uint256 lockDays = (stake.endTime - stake.startTime) / 1 days;
            uint256 multiplier = lockPeriods[lockDays];
            apy = flexibleBaseAPY.mul(multiplier).div(100);
        }
        
        // Calculate rewards: amount * APY * timeStaked / (365 days * 10000)
        // APY is in basis points, so divide by 10000
        uint256 reward = stake.amount
            .mul(apy)
            .mul(timeStaked)
            .div(365 days)
            .div(10000);
            
        return reward;
    }
    
    /**
     * @dev Calculates gVEX amount for a locked stake
     * @param amount Amount of VEX staked
     * @param lockDays Number of days tokens are locked
     * @return gVexAmount Amount of gVEX to mint
     */
    function _calculateGVEXAmount(uint256 amount, uint256 lockDays) internal view returns (uint256) {
        // Base ratio: 1 VEX = 1 gVEX for standard lock period (30 days)
        // Adjust based on lock period multiplier
        uint256 multiplier = lockPeriods[lockDays];
        return amount.mul(multiplier).div(100);
    }
    
    /**
     * @dev Updates the base APY for flexible staking
     * @param newBaseAPY New base APY in basis points
     */
    function setBaseAPY(uint256 newBaseAPY) external onlyOwner {
        require(newBaseAPY <= 1000, "Staking: APY cannot exceed 10%");
        flexibleBaseAPY = newBaseAPY;
        emit APYUpdated(newBaseAPY);
    }
    
    /**
     * @dev Adds or updates a lock period option
     * @param days_ Number of days for the lock period
     * @param multiplier APY multiplier in basis points (100 = 1x)
     */
    function setLockPeriod(uint256 days_, uint256 multiplier) external onlyOwner {
        require(days_ >= 30, "Staking: Lock period must be at least 30 days");
        require(multiplier >= 100, "Staking: Multiplier must be at least 1x");
        lockPeriods[days_] = multiplier;
        emit LockPeriodAdded(days_, multiplier);
    }
    
    /**
     * @dev Removes a lock period option
     * @param days_ Number of days to remove
     */
    function removeLockPeriod(uint256 days_) external onlyOwner {
        require(lockPeriods[days_] > 0, "Staking: Lock period does not exist");
        delete lockPeriods[days_];
        emit LockPeriodRemoved(days_);
    }
    
    /**
     * @dev Gets all stakes for a user
     * @param user Address to check
     * @return stakes Array of user stakes
     */
    function getUserStakes(address user) external view returns (Stake[] memory) {
        return userStakes[user];
    }
    
    /**
     * @dev Gets the pending rewards for a stake
     * @param user User address
     * @param stakeIndex Index of the stake
     * @return reward Pending reward amount
     */
    function getPendingReward(address user, uint256 stakeIndex) external view returns (uint256) {
        require(stakeIndex < userStakes[user].length, "Staking: Invalid stake index");
        return _calculateReward(userStakes[user][stakeIndex]);
    }
    
    /**
     * @dev Updates the treasury address
     * @param _treasury New treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Staking: Treasury cannot be zero address");
        treasury = _treasury;
    }
}
