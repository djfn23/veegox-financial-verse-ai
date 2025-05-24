const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// GET /api/block/:blockNumber
router.get('/block/:blockNumber', async (req, res) => {
  try {
    const blockNumber = parseInt(req.params.blockNumber);
    if (isNaN(blockNumber)) {
      return res.status(400).json({ error: 'Numéro de bloc invalide' });
    }
    const block = await provider.getBlock(blockNumber);
    if (!block) {
      return res.status(404).json({ error: 'Bloc non trouvé' });
    }
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
