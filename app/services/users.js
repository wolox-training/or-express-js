const db = require('../models');
const errors = require('../errors');

const createUser = body =>
  db.User.newUser(body)
    .then(user => user)
    .catch(() => Promise.reject(errors.databaseError('User could not be created.')));

module.exports = { createUser };
