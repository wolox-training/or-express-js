const errors = require('../errors');
const { findOne } = require('../services/users');
const { company } = require('../../config/index').common;

const checkIfEmailExists = async (req, _, next) => {
  const registered = await findOne({ email: req.body.email });
  const isWoloxDomain = company.domain.localeCompare(
    req.body.email.substring(req.body.email.lastIndexOf('@') + 1)
  );
  if (registered) {
    return next(errors.registeredEmailError('Email is already registered.'));
  }
  if (isWoloxDomain !== 0) {
    return next(errors.domainEmailError('Domain is not valid'));
  }
  return next();
};

module.exports = checkIfEmailExists;
