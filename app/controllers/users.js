const usersService = require('../services/users');
const errors = require('../errors');
const logger = require('../logger');

const signUp = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (userFound) {
      logger.error('REGISTERED_EMAIL_ERROR');
      return next(errors.registeredEmailError('REGISTERED_EMAIL_ERROR'));
    }
    const createdUser = await usersService.createUser(userData);
    logger.info(createdUser.email);
    return res.status(201).send();
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

module.exports = { signUp };
