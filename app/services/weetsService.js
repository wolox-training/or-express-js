const axios = require('axios');


const api = axios.create({
  baseURL: 'http://numbersapi.com',
  timeout: 3000
});

const getWeet = async () => {
  try{
    const { data } = await api.get('/random');
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWeet
};
