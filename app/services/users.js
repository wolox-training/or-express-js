const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config').common.hash;
const User = require('../models').user;
const logger = require('../logger');
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

const comparePassword = async (password, dbPassword) => {
  const match = await bcrypt.compare(password, dbPassword);
  return match;
};

const generateToken = user =>
  jwt.sign({ id: user.id, role: user.role, email: user.email, iat: Date.now() }, process.env.JWT_SECRET, {
    expiresIn: '30m'
  });

const login = user => {
  const token = generateToken(user);
  logger.info(`User login: ${user.firstName} ${user.lastName}`);
  return { user, token };
};

module.exports = { createUser, findOne, findByEmail, comparePassword, login };
