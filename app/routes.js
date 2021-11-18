// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const usersController = require('./controllers/users');
const checkIfEmailExists = require('./middlewares/emailValidation');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [checkIfEmailExists], usersController.signUp);
};
