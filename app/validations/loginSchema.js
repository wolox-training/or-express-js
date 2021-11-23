const errorMessages = require('../constants/errorMessages');

module.exports = {
  email: {
    in: 'body',
    optional: false,
    notEmpty: true,
    errorMessage: errorMessages.emailRequired
  },
  password: {
    in: 'body',
    optional: false,
    notEmpty: true,
    errorMessage: errorMessages.passwordRequired,
    isLength: {
      errorMessage: errorMessages.invalidPasswordLength,
      options: { min: 6 }
    },
    isAlphanumeric: {
      errorMessage: errorMessages.invalidPassword
    }
  }
};
