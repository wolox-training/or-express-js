const moment = require('moment');
const errorMessages = require('../constants/errorMessages');

const User = require('../models').user;
const errors = require('../errors');

exports.validateToken = async tokenDecoded => {
  const user = await User.findOne({ where: { email: tokenDecoded.email } });
  if (!user) {
    throw errors.authenticationError(errorMessages.userNotFound);
  }
  return user.timestampTokenIat && moment(user.timestampTokenIat).isSameOrBefore(moment(tokenDecoded.iat));
};
