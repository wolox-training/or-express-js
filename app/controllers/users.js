const usersService = require('../services/users');
const errors = require('../errors');
const logger = require('../logger');

const signUp = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (userFound) {
      logger.error('EMAIL_CONFLICT');
      return next(errors.conflict('EMAIL_CONFLICT'));
    }
    const createdUser = await usersService.createUser(userData);
    logger.info(createdUser.email);
    return res.status(201).send(createdUser);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

module.exports = { signUp };
