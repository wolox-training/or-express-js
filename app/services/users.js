const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const config = require('../../config').common.hash;
const User = require('../models').user;
const logger = require('../logger');
const formatEmail = require('../utils/formatEmail');
const jwtSecret = require('../../config').common.jwt.secret_key;
const errors = require('../errors');

const findOne = async condition => {
  const user = await User.findOne({ where: condition });
  return user;
};

const findByEmail = email => User.findOne({ where: { email: formatEmail(email) } });

const createUser = async data => {
  const user = await User.create({
    ...data,
    email: formatEmail(data.email),
    password: await bcrypt.hashSync(data.password, config.salt),
    admin: false
  });
  return user;
};

const createUserAdmin = async body => {
  try {
    let user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      user = await createUser(body);
    }
    return user.update({ admin: true });
  } catch (e) {
    throw errors.databaseError(e.message);
  }
};

const comparePassword = async (password, dbPassword) => {
  const match = await bcrypt.compare(password, dbPassword);
  return match;
};

const generateToken = user =>
  jwt.sign({ id: user.id, role: user.role, email: user.email, iat: Date.now() }, jwtSecret, {
    expiresIn: '30m'
  });

const login = user => {
  const token = generateToken(user);
  logger.info(`User login: ${user.firstName} ${user.lastName}`);
  user.update({ timestampTokenIat: moment().format() });
  return { user, token };
};

module.exports = { createUser, createUserAdmin, findOne, findByEmail, comparePassword, login };
