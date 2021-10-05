const api = require('../helpers/axios');
const errors = require('../errors');

const getWeet = async () => {
  try {
    const { data } = await api.get('/random');
    if (!data) throw errors.apiConnectionError('Could not connect with numbers api');
    return data;
  } catch (error) {
    throw errors.apiExternalError('Error from external API');
  }
};

module.exports = {
  getWeet
};
