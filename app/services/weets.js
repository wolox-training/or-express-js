const api = require('../helpers/axios');
const errors = require('../middlewares/errors');

const getWeet = async () => {
  try {
    const { data } = await api.get('/random');
    if (!data) throw errors.apiConnectionError('Could not connect with numbers api');
    return data;
  } catch (error) {
    throw errors.api_external_error('Error from external API');
  }
};

module.exports = {
  getWeet
};
