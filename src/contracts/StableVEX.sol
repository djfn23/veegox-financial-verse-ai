
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title StableVEX
 * @dev sVEX is the stable token of the Veegox ecosystem, pegged to USDC
 */
contract StableVEX is ERC20, ERC20Burnable, Ownable {
    using SafeMath for uint256;
    
    // USDC contract reference
    IERC20 public usdc;
    
    // Oracle for price feeds
    AggregatorV3Interface public priceFeed;
    
    // Collateralization ratio (in basis points, 12000 = 120%)
    uint256 public collateralRatio = 12000;
    
    // Minimum collateralization required to mint sVEX (in basis points)
    uint256 public minCollateralization = 11000;
    
    // Fee for minting and redeeming (in basis points, 10 = 0.1%)
    uint256 public mintFee = 10;
    uint256 public redeemFee = 10;
    
    // Events
    event Mint(address indexed user, uint256 usdcAmount, uint256 sVEXAmount);
    event Redeem(address indexed user, uint256 sVEXAmount, uint256 usdcAmount);
    event CollateralRatioUpdated(uint256 newRatio);
    event MinCollateralRatioUpdated(uint256 newRatio);
    event FeesUpdated(uint256 mintFee, uint256 redeemFee);
    event PriceFeedUpdated(address newPriceFeed);
    event USDCUpdated(address newUSDC);

    constructor(
        address initialOwner,
        address _usdc,
        address _priceFeed
    ) ERC20("Stable Veegox", "sVEX") Ownable(initialOwner) {
        require(_usdc != address(0), "sVEX: USDC address cannot be zero");
        require(_priceFeed != address(0), "sVEX: Price feed address cannot be zero");
        
        usdc = IERC20(_usdc);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    /**
     * @dev Mints sVEX tokens by depositing USDC collateral
     * @param usdcAmount Amount of USDC to deposit
     */
    function mint(uint256 usdcAmount) external {
        require(usdcAmount > 0, "sVEX: Amount must be greater than 0");
        
        // Calculate amount of sVEX to mint (1:1 ratio with USDC)
        uint256 sVEXAmount = usdcAmount;
        
        // Apply mint fee
        uint256 fee = sVEXAmount.mul(mintFee).div(10000);
        uint256 mintAmount = sVEXAmount.sub(fee);
        
        // Transfer USDC from user
        require(usdc.transferFrom(msg.sender, address(this), usdcAmount), "sVEX: USDC transfer failed");
        
        // Mint sVEX tokens
        _mint(msg.sender, mintAmount);
        
        // Mint fee portion to contract owner
        if (fee > 0) {
            _mint(owner(), fee);
        }
        
        emit Mint(msg.sender, usdcAmount, mintAmount);
    }
    
    /**
     * @dev Redeems sVEX tokens for USDC
     * @param sVEXAmount Amount of sVEX to redeem
     */
    function redeem(uint256 sVEXAmount) external {
        require(sVEXAmount > 0, "sVEX: Amount must be greater than 0");
        require(balanceOf(msg.sender) >= sVEXAmount, "sVEX: Insufficient balance");
        
        // Calculate amount of USDC to return (1:1 ratio with sVEX)
        uint256 usdcAmount = sVEXAmount;
        
        // Apply redeem fee
        uint256 fee = usdcAmount.mul(redeemFee).div(10000);
        uint256 redeemAmount = usdcAmount.sub(fee);
        
        // Burn sVEX tokens
        _burn(msg.sender, sVEXAmount);
        
        // Transfer USDC to user
        require(usdc.transfer(msg.sender, redeemAmount), "sVEX: USDC transfer failed");
        
        // Transfer fee to contract owner
        if (fee > 0) {
            require(usdc.transfer(owner(), fee), "sVEX: Fee transfer failed");
        }
        
        emit Redeem(msg.sender, sVEXAmount, redeemAmount);
    }
    
    /**
     * @dev Updates the collateral ratio
     * @param newRatio New collateralization ratio (in basis points)
     */
    function setCollateralRatio(uint256 newRatio) external onlyOwner {
        require(newRatio >= 10000, "sVEX: Ratio must be at least 100%");
        collateralRatio = newRatio;
        emit CollateralRatioUpdated(newRatio);
    }
    
    /**
     * @dev Updates the minimum collateralization required
     * @param newRatio New minimum collateralization (in basis points)
     */
    function setMinCollateralization(uint256 newRatio) external onlyOwner {
        require(newRatio >= 10000, "sVEX: Ratio must be at least 100%");
        require(newRatio <= collateralRatio, "sVEX: Must be less than collateral ratio");
        minCollateralization = newRatio;
        emit MinCollateralRatioUpdated(newRatio);
    }
    
    /**
     * @dev Updates fees
     * @param _mintFee New mint fee (in basis points)
     * @param _redeemFee New redeem fee (in basis points)
     */
    function setFees(uint256 _mintFee, uint256 _redeemFee) external onlyOwner {
        require(_mintFee <= 100, "sVEX: Mint fee cannot exceed 1%");
        require(_redeemFee <= 100, "sVEX: Redeem fee cannot exceed 1%");
        
        mintFee = _mintFee;
        redeemFee = _redeemFee;
        
        emit FeesUpdated(_mintFee, _redeemFee);
    }
    
    /**
     * @dev Updates the price feed address
     * @param _priceFeed New price feed address
     */
    function setPriceFeed(address _priceFeed) external onlyOwner {
        require(_priceFeed != address(0), "sVEX: Price feed cannot be zero address");
        priceFeed = AggregatorV3Interface(_priceFeed);
        emit PriceFeedUpdated(_priceFeed);
    }
    
    /**
     * @dev Updates the USDC contract address
     * @param _usdc New USDC address
     */
    function setUSDC(address _usdc) external onlyOwner {
        require(_usdc != address(0), "sVEX: USDC cannot be zero address");
        usdc = IERC20(_usdc);
        emit USDCUpdated(_usdc);
    }
    
    /**
     * @dev Returns the latest USDC/USD price from Chainlink
     */
    function getLatestPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }
    
    /**
     * @dev Returns the total collateral value held by the contract
     */
    function getTotalCollateral() public view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
    
    /**
     * @dev Returns the current collateralization percentage (in basis points)
     */
    function getCurrentCollateralization() public view returns (uint256) {
        uint256 totalSupply = totalSupply();
        if (totalSupply == 0) return 0;
        
        uint256 totalCollateral = getTotalCollateral();
        return totalCollateral.mul(10000).div(totalSupply);
    }
}
