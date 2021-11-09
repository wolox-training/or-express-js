const db = require('../models');
const errors = require('../errors');

const woloxDomain = '@wolox.com.ar';
const checkIfEmailExists = async (req, _, next) => {
  const registered = await db.User.findOne({ where: { email: req.body.email } });
  const isWoloxDomain = woloxDomain.localeCompare(
    req.body.email.substring(req.body.email.lastIndexOf('@') + 1)
  );
  if (registered) {
    return next(errors.registeredEmailError('Email is already registered.'));
  }
  if (!isWoloxDomain) {
    return next(errors.domainEmailError('Domain is not valid'));
  }
  return next();
};

module.exports = checkIfEmailExists;
