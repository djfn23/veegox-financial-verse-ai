const axios = require('axios');

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const BASE_URL = 'https://deep-index.moralis.io/api/v2';

const headers = {
  'accept': 'application/json',
  'X-API-Key': MORALIS_API_KEY
};

module.exports = {
  async getERC20Transactions(address) {
    const url = `${BASE_URL}/${address}/erc20/transfers`;
    const { data } = await axios.get(url, { headers });
    return data.result || [];
  },
  async getNFTs(address) {
    const url = `${BASE_URL}/${address}/nft`;
    const { data } = await axios.get(url, { headers });
    return data.result || [];
  },
  async getTokens(address) {
    const url = `${BASE_URL}/${address}/erc20`;
    const { data } = await axios.get(url, { headers });
    return data || [];
  },
  async getTransactions(address) {
    const url = `${BASE_URL}/${address}`;
    const { data } = await axios.get(url, { headers });
    return data.result || [];
  }
};
