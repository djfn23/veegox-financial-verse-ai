const express = require('express');
const router = express.Router();
const moralisService = require('../services/moralisService');

// GET /api/moralis/erc20/:address
router.get('/erc20/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const tokens = await moralisService.getTokens(address);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/moralis/erc20-tx/:address
router.get('/erc20-tx/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const txs = await moralisService.getERC20Transactions(address);
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/moralis/nfts/:address
router.get('/nfts/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const nfts = await moralisService.getNFTs(address);
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/moralis/tx/:address
router.get('/tx/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const txs = await moralisService.getTransactions(address);
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
