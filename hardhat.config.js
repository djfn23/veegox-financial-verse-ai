
require("@nomiclabs/hardhat-ethers");
const { BlockchainConfig } = require("./src/services/blockchain-config");

// Convert our BlockchainConfig to Hardhat format
const networks = {};

// Add mainnet networks
Object.entries({
  ethereum: BlockchainConfig.ethereum,
  polygon: BlockchainConfig.polygon,
}).forEach(([networkName, config]) => {
  networks[networkName] = {
    url: config.rpcUrls[0],
    chainId: config.chainId,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
  };
});

// Add testnet networks
Object.entries({
  goerli: BlockchainConfig.goerli,
  sepolia: BlockchainConfig.sepolia,
  mumbai: BlockchainConfig.mumbai,
}).forEach(([networkName, config]) => {
  networks[networkName] = {
    url: config.rpcUrls[0],
    chainId: config.chainId,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
  };
});

module.exports = {
  solidity: "0.8.20",
  networks,
  paths: {
    artifacts: "./src/artifacts"
  }
};
