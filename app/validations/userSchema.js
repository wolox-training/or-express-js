const errorMessages = require('../constants/errorMessages');

module.exports = {
  firstName: {
    in: 'body',
    optional: false,
    notEmpty: true,
    errorMessage: errorMessages.firstNameRequired
  },
  lastName: {
    in: 'body',
    optional: false,
    notEmpty: true,
    errorMessage: errorMessages.lastNameRequired
  },
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
