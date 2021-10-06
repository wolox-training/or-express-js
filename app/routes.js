// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const usersController = require('./controllers/users');
const checkIfEmailExists = require('./middlewares/emailValidation');

exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);

  app.post('/users', [checkIfEmailExists], usersController.signUp);
};
