const express = require('express');
const router = express.Router();
const web3Service = require('../services/web3Service');
const validateAddress = require('../middleware/validateAddress');

// GET /api/balance/:address
router.get('/balance/:address', validateAddress, async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await web3Service.getBalance(address);
    res.json({ address, balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/transactions/:address
router.get('/transactions/:address', validateAddress, async (req, res) => {
  try {
    const { address } = req.params;
    const txs = await web3Service.getTransactions(address);
    res.json({ address, transactions: txs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/network-stats
router.get('/network-stats', async (req, res) => {
  try {
    const stats = await web3Service.getNetworkStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
