const { ethers } = require('ethers');
const RPC_URL = process.env.RPC_URL || 'http://localhost:8545';
const provider = new ethers.JsonRpcProvider(RPC_URL);

module.exports = {
  async getBalance(address) {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  },
  async getTransactions(address) {
    // Pour une vraie blockchain, il faut indexer les transactions (Moralis, TheGraph, etc.)
    // Ici, mock ou à compléter avec Moralis plus tard
    return [];
  },
  async getNetworkStats() {
    const blockNumber = await provider.getBlockNumber();
    const latestBlock = await provider.getBlock(blockNumber);
    return {
      blockNumber,
      gasLimit: latestBlock.gasLimit?.toString() || null,
      timestamp: latestBlock.timestamp,
      tps: null // À calculer avec historique
    };
  }
};
