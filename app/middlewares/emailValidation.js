const errors = require('../errors');
const { findOne } = require('../services/users');
const { company } = require('../../config/index').common;
const errorMessages = require('../constants/errorMessages');

const checkIfEmailExists = async (req, _, next) => {
  const registered = await findOne({ email: req.body.email });
  const isWoloxDomain = company.domain.localeCompare(
    req.body.email.substring(req.body.email.lastIndexOf('@') + 1)
  );
  if (registered) {
    return next(errors.registeredEmailError(errorMessages.emailRegister));
  }
  if (isWoloxDomain !== 0) {
    return next(errors.domainEmailError(errorMessages.invalidDomain));
  }
  return next();
};

module.exports = checkIfEmailExists;
