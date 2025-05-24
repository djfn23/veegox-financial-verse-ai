require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'VeegoxChain backend opérationnel!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API VeegoxChain démarrée sur le port ${PORT}`);
});
