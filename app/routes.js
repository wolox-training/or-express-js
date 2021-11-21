const { healthCheck } = require('./controllers/healthCheck');
const validateSchema = require('./middlewares/validateSchema');
const usersController = require('./controllers/users');
const { userSchema } = require('./validations');
const checkIfEmailExists = require('./middlewares/emailValidation');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateSchema(userSchema)], [checkIfEmailExists], usersController.signUp);
};
