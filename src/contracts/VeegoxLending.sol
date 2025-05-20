// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title VeegoxLending
 * @dev Contract for collateralized lending in the Veegox ecosystem
 */
contract VeegoxLending is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // Oracle interface for price feeds
    struct PriceFeed {
        AggregatorV3Interface oracle;
        uint8 decimals;
        bool isActive;
    }
    
    // Supported collateral assets
    mapping(address => PriceFeed) public priceFeeds;
    address[] public supportedCollaterals;
    
    // Loan parameters
    struct LoanParams {
        uint256 minLoanAmount;           // Minimum loan amount in stablecoins
        uint256 maxLoanAmount;           // Maximum loan amount in stablecoins
        uint256 collateralRatio;         // Required collateral ratio (in basis points, e.g. 15000 = 150%)
        uint256 liquidationThreshold;    // Threshold for liquidation (in basis points, e.g. 12500 = 125%)
        uint256 liquidationPenalty;      // Penalty for liquidation (in basis points, e.g. 1000 = 10%)
        uint256 borrowFeeRate;           // Fee for borrowing (in basis points, e.g. 100 = 1%)
        bool isActive;                   // Whether this collateral is active for borrowing
    }
    
    // Collateral parameters
    mapping(address => LoanParams) public loanParameters;
    
    // Stablecoin used for loans
    IERC20 public stablecoin;
    
    // Treasury address for fees
    address public treasury;
    
    // User's active loans
    struct Loan {
        uint256 id;
        address borrower;
        address collateralToken;
        uint256 collateralAmount;
        uint256 loanAmount;
        uint256 interestRate;           // Annual interest rate (in basis points)
        uint256 startTime;
        uint256 endTime;                // 0 for open-ended loans
        uint256 lastInterestTime;
        bool isActive;
    }
    
    // Mapping from loan ID to loan details
    mapping(uint256 => Loan) public loans;
    uint256 public nextLoanId = 1;
    
    // Mapping from user address to their loan IDs
    mapping(address => uint256[]) public userLoans;
    
    // Events
    event CollateralAdded(address indexed token, address priceFeed);
    event CollateralRemoved(address indexed token);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, address collateralToken, uint256 collateralAmount, uint256 loanAmount);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 repayAmount);
    event CollateralAdded(uint256 indexed loanId, uint256 amount);
    event CollateralWithdrawn(uint256 indexed loanId, uint256 amount);
    event LoanLiquidated(uint256 indexed loanId, address liquidator, uint256 collateralAmount, uint256 loanAmount);
    
    constructor(
        address initialOwner,
        address _stablecoin,
        address _treasury
    ) Ownable(initialOwner) {
        require(_stablecoin != address(0), "Lending: Stablecoin cannot be zero address");
        require(_treasury != address(0), "Lending: Treasury cannot be zero address");
        
        stablecoin = IERC20(_stablecoin);
        treasury = _treasury;
    }
    
    /**
     * @dev Adds support for a new collateral token
     * @param collateralToken Address of the collateral token
     * @param priceFeedAddress Address of the price feed oracle
     * @param params Loan parameters for this collateral
     */
    function addCollateralSupport(
        address collateralToken,
        address priceFeedAddress,
        LoanParams memory params
    ) external onlyOwner {
        require(collateralToken != address(0), "Lending: Collateral cannot be zero address");
        require(priceFeedAddress != address(0), "Lending: Price feed cannot be zero address");
        require(priceFeeds[collateralToken].oracle == AggregatorV3Interface(address(0)), "Lending: Collateral already supported");
        
        // Add price feed
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        priceFeeds[collateralToken] = PriceFeed({
            oracle: priceFeed,
            decimals: priceFeed.decimals(),
            isActive: true
        });
        
        // Add loan parameters
        loanParameters[collateralToken] = params;
        
        // Add to supported collaterals
        supportedCollaterals.push(collateralToken);
        
        emit CollateralAdded(collateralToken, priceFeedAddress);
    }
    
    /**
     * @dev Removes support for a collateral token
     * @param collateralToken Address of the collateral token to remove
     */
    function removeCollateralSupport(address collateralToken) external onlyOwner {
        require(priceFeeds[collateralToken].oracle != AggregatorV3Interface(address(0)), "Lending: Collateral not supported");
        
        // Deactivate price feed but keep data for existing loans
        priceFeeds[collateralToken].isActive = false;
        loanParameters[collateralToken].isActive = false;
        
        // Remove from supported collaterals array
        for (uint i = 0; i < supportedCollaterals.length; i++) {
            if (supportedCollaterals[i] == collateralToken) {
                supportedCollaterals[i] = supportedCollaterals[supportedCollaterals.length - 1];
                supportedCollaterals.pop();
                break;
            }
        }
        
        emit CollateralRemoved(collateralToken);
    }
    
    /**
     * @dev Creates a new loan
     * @param collateralToken Address of the collateral token
     * @param collateralAmount Amount of collateral to deposit
     * @param loanAmount Amount of stablecoin to borrow
     * @param duration Duration of the loan in seconds (0 for open-ended)
     */
    function createLoan(
        address collateralToken,
        uint256 collateralAmount,
        uint256 loanAmount,
        uint256 duration
    ) external nonReentrant {
        // Validate parameters
        require(priceFeeds[collateralToken].isActive, "Lending: Collateral not supported");
        require(loanParameters[collateralToken].isActive, "Lending: Loans not active for this collateral");
        require(collateralAmount > 0, "Lending: Collateral amount must be greater than 0");
        require(loanAmount >= loanParameters[collateralToken].minLoanAmount, "Lending: Loan amount below minimum");
        require(loanAmount <= loanParameters[collateralToken].maxLoanAmount, "Lending: Loan amount above maximum");
        
        // Check collateral ratio
        uint256 collateralValue = getCollateralValue(collateralToken, collateralAmount);
        uint256 requiredCollateralValue = loanAmount.mul(loanParameters[collateralToken].collateralRatio).div(10000);
        require(collateralValue >= requiredCollateralValue, "Lending: Insufficient collateral");
        
        // Transfer collateral from borrower
        IERC20(collateralToken).safeTransferFrom(msg.sender, address(this), collateralAmount);
        
        // Calculate loan fee
        uint256 fee = loanAmount.mul(loanParameters[collateralToken].borrowFeeRate).div(10000);
        uint256 loanAmountAfterFee = loanAmount.sub(fee);
        
        // Create loan record
        uint256 loanId = nextLoanId++;
        uint256 endTime = duration > 0 ? block.timestamp + duration : 0;
        
        loans[loanId] = Loan({
            id: loanId,
            borrower: msg.sender,
            collateralToken: collateralToken,
            collateralAmount: collateralAmount,
            loanAmount: loanAmount,
            interestRate: determineInterestRate(collateralToken, collateralValue, loanAmount),
            startTime: block.timestamp,
            endTime: endTime,
            lastInterestTime: block.timestamp,
            isActive: true
        });
        
        // Add to user's loans
        userLoans[msg.sender].push(loanId);
        
        // Transfer fee to treasury
        if (fee > 0) {
            stablecoin.safeTransfer(treasury, fee);
        }
        
        // Transfer loan amount to borrower
        stablecoin.safeTransfer(msg.sender, loanAmountAfterFee);
        
        emit LoanCreated(loanId, msg.sender, collateralToken, collateralAmount, loanAmount);
    }
    
    /**
     * @dev Repays part or all of a loan
     * @param loanId ID of the loan to repay
     * @param repayAmount Amount to repay (0 to repay the full loan with interest)
     */
    function repayLoan(uint256 loanId, uint256 repayAmount) external nonReentrant {
        Loan storage loan = loans[loanId];
        
        require(loan.isActive, "Lending: Loan is not active");
        require(loan.borrower == msg.sender, "Lending: Not the borrower");
        
        // Calculate accrued interest
        uint256 interest = calculateInterest(loanId);
        uint256 totalDue = loan.loanAmount.add(interest);
        
        // Determine repayment amount
        uint256 amountToRepay;
        if (repayAmount == 0 || repayAmount >= totalDue) {
            amountToRepay = totalDue;
        } else {
            amountToRepay = repayAmount;
        }
        
        // Transfer repayment amount from borrower
        stablecoin.safeTransferFrom(msg.sender, address(this), amountToRepay);
        
        // Full repayment
        if (amountToRepay >= totalDue) {
            // Return collateral
            IERC20(loan.collateralToken).safeTransfer(msg.sender, loan.collateralAmount);
            
            // Mark loan as inactive
            loan.isActive = false;
        } else {
            // Partial repayment - reduce loan amount
            uint256 interestPortion = amountToRepay > interest ? interest : amountToRepay;
            uint256 principalPortion = amountToRepay.sub(interestPortion);
            
            loan.loanAmount = loan.loanAmount.sub(principalPortion);
            loan.lastInterestTime = block.timestamp;
        }
        
        emit LoanRepaid(loanId, msg.sender, amountToRepay);
    }
    
    /**
     * @dev Adds more collateral to an existing loan
     * @param loanId ID of the loan
     * @param additionalCollateral Amount of additional collateral
     */
    function addCollateral(uint256 loanId, uint256 additionalCollateral) external nonReentrant {
        Loan storage loan = loans[loanId];
        
        require(loan.isActive, "Lending: Loan is not active");
        require(loan.borrower == msg.sender, "Lending: Not the borrower");
        require(additionalCollateral > 0, "Lending: Amount must be greater than 0");
        
        // Transfer additional collateral
        IERC20(loan.collateralToken).safeTransferFrom(msg.sender, address(this), additionalCollateral);
        
        // Update loan
        loan.collateralAmount = loan.collateralAmount.add(additionalCollateral);
        
        emit CollateralAdded(loanId, additionalCollateral);
    }
    
    /**
     * @dev Withdraws excess collateral from a loan
     * @param loanId ID of the loan
     * @param collateralAmount Amount of collateral to withdraw
     */
    function withdrawCollateral(uint256 loanId, uint256 collateralAmount) external nonReentrant {
        Loan storage loan = loans[loanId];
        
        require(loan.isActive, "Lending: Loan is not active");
        require(loan.borrower == msg.sender, "Lending: Not the borrower");
        require(collateralAmount > 0, "Lending: Amount must be greater than 0");
        require(collateralAmount < loan.collateralAmount, "Lending: Cannot withdraw all collateral");
        
        // Calculate interest
        uint256 interest = calculateInterest(loanId);
        uint256 totalDue = loan.loanAmount.add(interest);
        
        // Check remaining collateral would be sufficient
        uint256 remainingCollateral = loan.collateralAmount.sub(collateralAmount);
        uint256 remainingValue = getCollateralValue(loan.collateralToken, remainingCollateral);
        uint256 requiredValue = totalDue.mul(loanParameters[loan.collateralToken].collateralRatio).div(10000);
        
        require(remainingValue >= requiredValue, "Lending: Withdrawal would breach collateral ratio");
        
        // Update loan
        loan.collateralAmount = remainingCollateral;
        
        // Transfer collateral back to borrower
        IERC20(loan.collateralToken).safeTransfer(msg.sender, collateralAmount);
        
        emit CollateralWithdrawn(loanId, collateralAmount);
    }
    
    /**
     * @dev Liquidates an undercollateralized loan
     * @param loanId ID of the loan to liquidate
     */
    function liquidateLoan(uint256 loanId) external nonReentrant {
        Loan storage loan = loans[loanId];
        
        require(loan.isActive, "Lending: Loan is not active");
        
        // Check if loan can be liquidated
        require(canLiquidate(loanId), "Lending: Loan cannot be liquidated");
        
        // Calculate total due with interest
        uint256 interest = calculateInterest(loanId);
        uint256 totalDue = loan.loanAmount.add(interest);
        
        // Add liquidation penalty
        uint256 liquidationPenalty = totalDue.mul(loanParameters[loan.collateralToken].liquidationPenalty).div(10000);
        uint256 totalDueWithPenalty = totalDue.add(liquidationPenalty);
        
        // Transfer total due from liquidator
        stablecoin.safeTransferFrom(msg.sender, address(this), totalDue);
        
        // Transfer penalty to treasury if applicable
        if (liquidationPenalty > 0) {
            stablecoin.safeTransferFrom(msg.sender, treasury, liquidationPenalty);
        }
        
        // Transfer collateral to liquidator
        IERC20(loan.collateralToken).safeTransfer(msg.sender, loan.collateralAmount);
        
        // Mark loan as inactive
        loan.isActive = false;
        
        emit LoanLiquidated(loanId, msg.sender, loan.collateralAmount, totalDueWithPenalty);
    }
    
    /**
     * @dev Checks if a loan can be liquidated
     * @param loanId ID of the loan to check
     * @return canBeLiquidated Whether the loan can be liquidated
     */
    function canLiquidate(uint256 loanId) public view returns (bool) {
        Loan storage loan = loans[loanId];
        
        if (!loan.isActive) {
            return false;
        }
        
        // Check if loan is expired (for fixed-term loans)
        if (loan.endTime > 0 && block.timestamp > loan.endTime) {
            return true;
        }
        
        // Check collateral ratio
        uint256 interest = calculateInterest(loanId);
        uint256 totalDue = loan.loanAmount.add(interest);
        
        uint256 collateralValue = getCollateralValue(loan.collateralToken, loan.collateralAmount);
        uint256 liquidationValue = totalDue.mul(loanParameters[loan.collateralToken].liquidationThreshold).div(10000);
        
        return collateralValue < liquidationValue;
    }
    
    /**
     * @dev Calculates accrued interest for a loan
     * @param loanId ID of the loan
     * @return interest Accrued interest amount
     */
    function calculateInterest(uint256 loanId) public view returns (uint256) {
        Loan storage loan = loans[loanId];
        
        if (!loan.isActive) {
            return 0;
        }
        
        uint256 timeElapsed = block.timestamp - loan.lastInterestTime;
        
        // Calculate interest: principal * rate * time / (365 days * 10000)
        // Rate is in basis points, so divide by 10000
        uint256 interest = loan.loanAmount
            .mul(loan.interestRate)
            .mul(timeElapsed)
            .div(365 days)
            .div(10000);
            
        return interest;
    }
    
    /**
     * @dev Gets the USD value of collateral
     * @param collateralToken Address of the collateral token
     * @param amount Amount of collateral
     * @return value USD value of collateral
     */
    function getCollateralValue(address collateralToken, uint256 amount) public view returns (uint256) {
        PriceFeed memory feed = priceFeeds[collateralToken];
        require(feed.oracle != AggregatorV3Interface(address(0)), "Lending: No price feed for token");
        
        (, int256 price, , , ) = feed.oracle.latestRoundData();
        require(price > 0, "Lending: Invalid price");
        
        // Convert to 18 decimals for consistent calculation
        uint256 normalizedPrice;
        if (feed.decimals < 18) {
            normalizedPrice = uint256(price) * 10**(18 - feed.decimals);
        } else if (feed.decimals > 18) {
            normalizedPrice = uint256(price) / 10**(feed.decimals - 18);
        } else {
            normalizedPrice = uint256(price);
        }
        
        // Get token decimals
        uint8 tokenDecimals = IERC20(collateralToken).decimals();
        uint256 normalizedAmount;
        if (tokenDecimals < 18) {
            normalizedAmount = amount * 10**(18 - tokenDecimals);
        } else if (tokenDecimals > 18) {
            normalizedAmount = amount / 10**(tokenDecimals - 18);
        } else {
            normalizedAmount = amount;
        }
        
        return normalizedAmount * normalizedPrice / 10**18;
    }
    
    /**
     * @dev Determines the interest rate based on loan parameters
     * @param collateralToken Address of the collateral token
     * @param collateralValue USD value of collateral
     * @param loanAmount Amount of loan
     * @return interestRate Annual interest rate in basis points
     */
    function determineInterestRate(
        address collateralToken,
        uint256 collateralValue,
        uint256 loanAmount
    ) internal view returns (uint256) {
        // Base interest rate starts at 5% APR (500 basis points)
        uint256 baseRate = 500;
        
        // Calculate collateral ratio (collateralValue / loanAmount) * 10000 for basis points
        uint256 actualRatio = collateralValue.mul(10000).div(loanAmount);
        uint256 requiredRatio = loanParameters[collateralToken].collateralRatio;
        
        // If close to minimum, increase rate
        if (actualRatio < requiredRatio.mul(12).div(10)) {
            return baseRate.add(300); // +3% for risky loans
        } else if (actualRatio < requiredRatio.mul(15).div(10)) {
            return baseRate.add(200); // +2% for medium risk
        } else if (actualRatio < requiredRatio.mul(20).div(10)) {
            return baseRate.add(100); // +1% for low risk
        } else {
            return baseRate; // Base rate for well-collateralized loans
        }
    }
    
    /**
     * @dev Gets all active loans for a user
     * @param user Address of the user
     * @return activeLoanIds Array of active loan IDs
     */
    function getUserActiveLoans(address user) external view returns (uint256[] memory) {
        uint256[] memory allLoans = userLoans[user];
        
        // Count active loans
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allLoans.length; i++) {
            if (loans[allLoans[i]].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active loan IDs
        uint256[] memory activeLoanIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < allLoans.length; i++) {
            if (loans[allLoans[i]].isActive) {
                activeLoanIds[index] = allLoans[i];
                index++;
            }
        }
        
        return activeLoanIds;
    }
    
    /**
     * @dev Updates the treasury address
     * @param _treasury New treasury address
     */
    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Lending: Treasury cannot be zero address");
        treasury = _treasury;
    }
    
    /**
     * @dev Updates loan parameters for a collateral token
     * @param collateralToken Address of the collateral token
     * @param params New loan parameters
     */
    function updateLoanParameters(
        address collateralToken,
        LoanParams memory params
    ) external onlyOwner {
        require(priceFeeds[collateralToken].oracle != AggregatorV3Interface(address(0)), "Lending: Collateral not supported");
        loanParameters[collateralToken] = params;
    }
}
