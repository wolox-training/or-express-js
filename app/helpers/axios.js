const axios = require('axios');
const config = require('../../config/index').common.numberApi;

const api = axios.create({
  baseURL: config.numbers,
  timeout: 3000
});

module.exports = api;
