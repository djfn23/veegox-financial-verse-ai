
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./VEXToken.sol";

/**
 * @title VeegoxTreasury
 * @dev Contract for managing the Veegox protocol's treasury
 */
contract VeegoxTreasury is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // VEX token reference
    VEXToken public vexToken;
    
    // Fee allocation percentages (in basis points, e.g., 3000 = 30%)
    uint256 public buybackPercentage = 3000;   // 30% for token buyback and burn
    uint256 public stakingPercentage = 4000;   // 40% for staking rewards
    uint256 public daoPercentage = 3000;       // 30% for DAO treasury
    
    // Contract addresses for fee distribution
    address public stakingContract;
    address public daoContract;
    
    // Supported tokens for buyback
    mapping(address => bool) public supportedTokens;
    
    // Events
    event FeeDistributed(address indexed token, uint256 amount);
    event TokenBoughtBack(address indexed token, uint256 tokenAmount, uint256 vexAmount);
    event AllocationUpdated(uint256 buyback, uint256 staking, uint256 dao);
    event ContractAddressUpdated(string name, address addr);
    event TokenSupportUpdated(address indexed token, bool isSupported);
    
    constructor(
        address initialOwner,
        address _vexToken
    ) Ownable(initialOwner) {
        require(_vexToken != address(0), "Treasury: VEX cannot be zero address");
        vexToken = VEXToken(_vexToken);
    }
    
    /**
     * @dev Distributes fees according to allocation percentages
     * @param token Address of the token to distribute
     * @param amount Amount of tokens to distribute
     */
    function distributeFees(address token, uint256 amount) external {
        require(msg.sender == owner() || msg.sender == address(vexToken), "Treasury: Not authorized");
        require(amount > 0, "Treasury: Amount must be greater than 0");
        require(IERC20(token).balanceOf(address(this)) >= amount, "Treasury: Insufficient balance");
        
        // Calculate allocations
        uint256 buybackAmount = amount.mul(buybackPercentage).div(10000);
        uint256 stakingAmount = amount.mul(stakingPercentage).div(10000);
        uint256 daoAmount = amount.mul(daoPercentage).div(10000);
        
        // Handle buyback portion
        if (buybackAmount > 0 && supportedTokens[token]) {
            _buybackAndBurn(token, buybackAmount);
        }
        
        // Transfer staking portion
        if (stakingAmount > 0 && stakingContract != address(0)) {
            IERC20(token).safeTransfer(stakingContract, stakingAmount);
        }
        
        // Transfer DAO portion
        if (daoAmount > 0 && daoContract != address(0)) {
            IERC20(token).safeTransfer(daoContract, daoAmount);
        }
        
        emit FeeDistributed(token, amount);
    }
    
    /**
     * @dev Internal function to buy back VEX tokens and burn them
     * @param token Address of the token to use for buyback
     * @param amount Amount of tokens to use
     */
    function _buybackAndBurn(address token, uint256 amount) internal {
        // Note: In a real implementation, this would interact with a DEX like Uniswap
        // For demo purposes, we're using a simplified approach
        
        // 1. Get the amount of VEX that can be bought with the tokens
        // This would normally calculate based on current prices from a DEX
        uint256 vexAmount = calculateVexEquivalent(token, amount);
        
        if (vexAmount == 0) {
            return;
        }
        
        // 2. In a real implementation, perform the swap via DEX
        // For demo, we'll simulate by burning VEX directly from treasury's balance
        uint256 vexBalance = vexToken.balanceOf(address(this));
        if (vexBalance >= vexAmount) {
            vexToken.burn(vexAmount);
            emit TokenBoughtBack(token, amount, vexAmount);
        }
    }
    
    /**
     * @dev Calculate how much VEX can be bought with a given token amount
     * In a real implementation, this would query a DEX for current prices
     * @param token Address of the token
     * @param amount Amount of tokens
     * @return vexAmount Amount of VEX that could be purchased
     */
    function calculateVexEquivalent(address token, uint256 amount) public view returns (uint256) {
        // Simplified calculation for demo purposes
        // In a real implementation, this would query a price oracle or DEX
        
        // For this demo, assume 1 token = 1 VEX
        // In reality, you'd use an oracle like Chainlink or query a DEX
        return amount;
    }
    
    /**
     * @dev Updates the fee allocation percentages
     * @param _buyback Percentage for buyback (basis points)
     * @param _staking Percentage for staking (basis points)
     * @param _dao Percentage for DAO (basis points)
     */
    function updateAllocation(
        uint256 _buyback,
        uint256 _staking,
        uint256 _dao
    ) external onlyOwner {
        require(_buyback.add(_staking).add(_dao) == 10000, "Treasury: Percentages must add up to 100%");
        
        buybackPercentage = _buyback;
        stakingPercentage = _staking;
        daoPercentage = _dao;
        
        emit AllocationUpdated(_buyback, _staking, _dao);
    }
    
    /**
     * @dev Sets the staking contract address
     * @param _stakingContract New staking contract address
     */
    function setStakingContract(address _stakingContract) external onlyOwner {
        require(_stakingContract != address(0), "Treasury: Cannot be zero address");
        stakingContract = _stakingContract;
        emit ContractAddressUpdated("Staking", _stakingContract);
    }
    
    /**
     * @dev Sets the DAO contract address
     * @param _daoContract New DAO contract address
     */
    function setDAOContract(address _daoContract) external onlyOwner {
        require(_daoContract != address(0), "Treasury: Cannot be zero address");
        daoContract = _daoContract;
        emit ContractAddressUpdated("DAO", _daoContract);
    }
    
    /**
     * @dev Updates support for a token in buyback operations
     * @param token Address of the token
     * @param isSupported Whether the token is supported
     */
    function updateTokenSupport(address token, bool isSupported) external onlyOwner {
        supportedTokens[token] = isSupported;
        emit TokenSupportUpdated(token, isSupported);
    }
    
    /**
     * @dev Withdraws tokens to the owner in case of emergency
     * @param token Address of the token to withdraw
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
}
