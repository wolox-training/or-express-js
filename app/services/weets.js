const api = require('../helpers/axios');
const errors = require('../errors');
const Weet = require('../models').weet;
const usersService = require('../services/users');
const { notFoundError } = require('../errors');
const errorMessages = require('../constants/errorMessages');

const getWeet = async () => {
  try {
    const { data } = await api.get('/random');
    if (!data) throw errors.apiConnectionError('Could not connect with numbers api');
    return data;
  } catch (error) {
    throw errors.apiExternalError('Error from external API');
  }
};

const create = async body => {
  const weet = await Weet.create(body);
  return weet;
};

const saveWeet = async body => {
  const user = await usersService.findByEmail(body.email);
  if (!user) throw notFoundError(errorMessages.userNotFound);
  const content = await getWeet();
  const weet = await create({ content, userId: user.id });
  return weet;
};

module.exports = { getWeet, saveWeet, create };
