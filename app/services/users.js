const bcrypt = require('bcrypt');
const config = require('../../config').common.hash;
const User = require('../models').user;
const formatEmail = require('../utils/formatEmail');

const findOne = async condition => {
  const user = await User.findOne({ where: condition });
  return user;
};

const findByEmail = email => User.findOne({ where: { email: formatEmail(email) } });

const createUser = async data => {
  const user = await User.create({
    ...data,
    email: formatEmail(data.email),
    password: await bcrypt.hashSync(data.password, config.salt)
  });
  return user;
};

module.exports = { createUser, findOne, findByEmail };
