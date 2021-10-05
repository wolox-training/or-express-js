const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};

const externalError = (message, externalCode) => ({
  message,
  externalCode
});

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};

exports.API_CONNECTION_ERROR = 'api_connection_error';
exports.apiConnectionError = message => externalError(message, exports.API_CONNECTION_ERROR);

exports.API_EXTERNAL_ERROR = 'api_external_error';
exports.apiExternalError = message => externalError(message, exports.API_EXTERNAL_ERROR);
