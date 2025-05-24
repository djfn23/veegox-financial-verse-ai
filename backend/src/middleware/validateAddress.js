const { ethers } = require('ethers');

module.exports = function validateAddress(req, res, next) {
  const address = req.params.address;
  if (!address || !ethers.isAddress(address)) {
    return res.status(400).json({ error: 'Adresse Ethereum invalide' });
  }
  next();
};
