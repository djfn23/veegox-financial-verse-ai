
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title VEXToken
 * @dev VEX is the main utility token of the Veegox ecosystem
 */
contract VEXToken is ERC20, ERC20Burnable, Ownable {
    using SafeMath for uint256;
    
    // Initial token supply: 100,000,000 VEX
    uint256 private constant INITIAL_SUPPLY = 100_000_000 * 10**18;
    
    // Treasury address for fee distribution
    address public treasury;
    
    // Fee settings
    uint256 public buyFee = 0; // Initialize at 0%, can be set by owner
    uint256 public sellFee = 0; // Initialize at 0%, can be set by owner
    uint256 public transferFee = 0; // Initialize at 0%, can be set by owner
    
    // Fee exemptions
    mapping(address => bool) public isExemptFromFee;
    
    // Events
    event TreasuryUpdated(address indexed newTreasury);
    event FeeUpdated(uint256 buyFee, uint256 sellFee, uint256 transferFee);
    event FeeExemptionSet(address indexed account, bool isExempt);

    constructor(address initialOwner) ERC20("Veegox", "VEX") Ownable(initialOwner) {
        _mint(initialOwner, INITIAL_SUPPLY);
        
        // Set initial treasury as owner
        treasury = initialOwner;
        
        // Owner is exempt from fees
        isExemptFromFee[initialOwner] = true;
    }
    
    /**
     * @dev Updates the treasury address
     * @param _treasury New treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "VEX: Treasury cannot be zero address");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }
    
    /**
     * @dev Sets fee percentages (in basis points, 100 = 1%)
     * @param _buyFee New buy fee (max 500 = 5%)
     * @param _sellFee New sell fee (max 500 = 5%)
     * @param _transferFee New transfer fee (max 300 = 3%)
     */
    function setFees(uint256 _buyFee, uint256 _sellFee, uint256 _transferFee) external onlyOwner {
        require(_buyFee <= 500, "VEX: Buy fee too high");
        require(_sellFee <= 500, "VEX: Sell fee too high");
        require(_transferFee <= 300, "VEX: Transfer fee too high");
        
        buyFee = _buyFee;
        sellFee = _sellFee;
        transferFee = _transferFee;
        
        emit FeeUpdated(_buyFee, _sellFee, _transferFee);
    }
    
    /**
     * @dev Sets fee exemption status for an account
     * @param account Address to update
     * @param exempt Whether the address is exempt from fees
     */
    function setFeeExemption(address account, bool exempt) external onlyOwner {
        isExemptFromFee[account] = exempt;
        emit FeeExemptionSet(account, exempt);
    }
    
    /**
     * @dev Override _transfer to implement fee logic
     */
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        // Skip fee logic if either account is exempt
        if (isExemptFromFee[sender] || isExemptFromFee[recipient]) {
            super._transfer(sender, recipient, amount);
            return;
        }
        
        // Determine fee type and amount
        uint256 feeAmount = 0;
        
        // Apply appropriate fee based on transaction type
        // This is a simplified implementation that would need customization
        // based on DEX integration to detect buys and sells
        if (transferFee > 0) {
            feeAmount = amount.mul(transferFee).div(10000);
        }
        
        // Transfer fee to treasury if applicable
        if (feeAmount > 0 && treasury != address(0)) {
            super._transfer(sender, treasury, feeAmount);
            super._transfer(sender, recipient, amount.sub(feeAmount));
        } else {
            super._transfer(sender, recipient, amount);
        }
    }
    
    /**
     * @dev Limited token minting capability for future ecosystem growth
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
