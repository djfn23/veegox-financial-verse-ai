require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(cors());
app.use(express.json());

// Router Web3
const web3Router = require('./routes/web3');
const moralisRouter = require('./routes/moralis');
const waltioRouter = require('./routes/waltio');
const explorerRouter = require('./routes/explorer');
app.use('/api', web3Router);
app.use('/api/moralis', moralisRouter);
app.use('/api/waltio', waltioRouter);
app.use('/api', explorerRouter);

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'VeegoxChain backend opérationnel!' });
});

// Swagger
const swaggerDocument = YAML.load(__dirname + '/../swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API VeegoxChain démarrée sur le port ${PORT}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api/docs`);
});
