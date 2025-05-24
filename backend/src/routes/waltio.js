const express = require('express');
const router = express.Router();
const waltioService = require('../services/waltioService');
const web3Service = require('../services/web3Service');

// GET /api/waltio/export/:address
router.get('/export/:address', async (req, res) => {
  try {
    const { address } = req.params;
    // À remplacer par une vraie récupération des transactions (Moralis, TheGraph...)
    const txs = await web3Service.getTransactions(address);
    const csv = waltioService.exportTransactionsToCSV(txs);
    res.header('Content-Type', 'text/csv');
    res.attachment(`waltio-veegoxchain-${address}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
