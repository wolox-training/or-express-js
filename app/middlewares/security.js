const jwt = require('jsonwebtoken');
const errorMessages = require('../constants/errorMessages');

const secretKey = require('../../config').common.jwt.secret_key;
const errors = require('../errors');
const securityService = require('../services/security');
const userService = require('../services/users');

exports.validateToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return next(errors.defaultError(errorMessages.tokenNotFound));
    }
    const decode = jwt.verify(token, secretKey);
    const valid = await securityService.validateToken(decode);
    if (valid) {
      // eslint-disable-next-line require-atomic-updates
      req.decode = decode;
      return next();
    }
    return next(errors.authenticationError(errorMessages.tokenNotValid));
  } catch (e) {
    return next(errors.authenticationError(e.message));
  }
};

exports.isAdmin = async (req, res, next) => {
  const user = await userService.findByEmail(req.decode.email);
  console.log(user.email);
  console.log(user.admin);
  if (!user.admin) {
    return next(errors.authenticationError(errorMessages.onlyAccessAdmin));
  }
  return next();
};
