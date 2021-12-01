const usersService = require('../services/users');
const errors = require('../errors');
const logger = require('../logger');
const errorMessages = require('../constants/errorMessages');

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

const signIn = async (req, res, next) => {
  const userData = req.body;
  try {
    const userExists = await usersService.findByEmail(userData.email);
    if (!userExists) {
      logger.error(errorMessages.userNotFound);
      return next(errors.databaseError(errorMessages.userNotFound));
    }
    const isEqual = await usersService.comparePassword(userData.password, userExists.password);
    if (!isEqual) {
      logger.error(errorMessages.invalidPassword);
      return next(errors.authenticationError(errorMessages.invalidCredentials));
    }
    return res.status(200).send(usersService.login(userExists));
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

const addUserAdmin = (req, res, next) =>
  usersService
    .createUserAdmin(req.body)
    .then(result => {
      logger.info(`User created as admin: ${result.email}`);
      return result;
    })
    .then(result => res.status(201).send(result))
    .catch(e => {
      logger.error(e.message);
      return next(e);
    });

module.exports = { signUp, signIn, addUserAdmin };
