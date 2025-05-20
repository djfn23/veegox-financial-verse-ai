
# Veegox Smart Contracts

This directory contains the core smart contracts for the Veegox DeFi ecosystem.

## Core Tokens

1. **VEXToken.sol**: The main utility token of the Veegox ecosystem
   - Used for utility, fees, governance, and staking
   - Total supply: 100,000,000 VEX

2. **StableVEX.sol (sVEX)**: A stablecoin pegged to USDC
   - Maintains stable value through collateralization
   - Used for savings and lending in the platform

3. **GovernanceVEX.sol (gVEX)**: The governance token
   - Non-transferable token earned through VEX staking
   - Used for voting in the DAO

## System Contracts

1. **VeegoxStaking.sol**: Manages staking of VEX tokens
   - Flexible staking with daily rewards
   - Time-locked staking for higher rewards and gVEX

2. **VeegoxLending.sol**: Handles collateralized lending
   - Multiple collateral types with different parameters
   - Interest rates based on collateral ratio
   - Liquidation mechanism for under-collateralized loans

3. **VeegoxTreasury.sol**: Manages protocol funds
   - Fee distribution according to tokenomics
   - Token buyback and burn mechanism
   - Distribution to staking and DAO

4. **VeegoxDAO.sol**: Governance system
   - Proposal creation and voting
   - Time-weighted voting power
   - Execution of approved proposals

## Deployment

Use the provided `deploy.js` script to deploy the contracts in the correct order with proper initialization.

## Required Dependencies

- OpenZeppelin contracts (access control, token standards, security)
- Chainlink (price feeds for collateral valuation)
- Hardhat (development and testing)

## Security Notes

These contracts should undergo thorough security auditing before mainnet deployment:
1. Independent security audits by multiple firms
2. Bug bounty program
3. Gradual rollout with value limits
4. Emergency pause functionality
