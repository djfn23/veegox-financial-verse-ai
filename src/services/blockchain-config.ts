
/**
 * Configuration for blockchain connections
 * Contains endpoints for different networks
 */
export const BlockchainConfig = {
  ethereum: {
    rpcUrls: [
      "https://site1.moralis-nodes.com/eth/90afb0797cab47f191f20e328e580934",
      "https://site2.moralis-nodes.com/eth/90afb0797cab47f191f20e328e580934"
    ],
    chainId: 1,
    name: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io"
  },
  polygon: {
    rpcUrls: [
      "https://site1.moralis-nodes.com/polygon/baf10e3714e745cda2aeb7cd01e89600",
      "https://site2.moralis-nodes.com/polygon/baf10e3714e745cda2aeb7cd01e89600"
    ],
    chainId: 137,
    name: "Polygon Mainnet",
    blockExplorer: "https://polygonscan.com"
  },
  veegoxchain: {
    rpcUrls: [
      "http://localhost:10002",
      "http://localhost:20002",
      "http://localhost:30002"
    ],
    chainId: 1999,
    name: "VeegoxChain",
    blockExplorer: "http://localhost:4000"
  },
  goerli: {
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    chainId: 5,
    name: "Goerli Testnet",
    blockExplorer: "https://goerli.etherscan.io"
  },
  sepolia: {
    rpcUrls: ["https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    chainId: 11155111,
    name: "Sepolia Testnet",
    blockExplorer: "https://sepolia.etherscan.io"
  },
  mumbai: {
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    chainId: 80001,
    name: "Mumbai Testnet",
    blockExplorer: "https://mumbai.polygonscan.com"
  }
};
