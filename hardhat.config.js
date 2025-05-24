
require("@nomiclabs/hardhat-ethers");
const { BlockchainConfig } = require("./src/services/blockchain-config");

// Convert our BlockchainConfig to Hardhat format
const networks = {};

// Add mainnet networks
Object.entries({
  ethereum: BlockchainConfig.ethereum,
  polygon: BlockchainConfig.polygon,
  veegoxchain: BlockchainConfig.veegoxchain,
}).forEach(([networkName, config]) => {
  networks[networkName] = {
    url: config.rpcUrls[0],
    chainId: config.chainId,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    gas: networkName === 'veegoxchain' ? 30000000 : undefined,
    gasPrice: networkName === 'veegoxchain' ? 1000000000 : undefined, // 1 gwei
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
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks,
  paths: {
    artifacts: "./src/artifacts"
  }
};
