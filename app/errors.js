const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.API_CONNECTION_ERROR = 'api_connection_error';
exports.apiConnectionError = message => internalError(message, exports.API_CONNECTION_ERROR);

exports.API_EXTERNAL_ERROR = 'api_external_error';
exports.apiExternalError = message => internalError(message, exports.API_EXTERNAL_ERROR);

exports.REGISTERED_EMAIL_ERROR = 'registered_email_error';
exports.registeredEmailError = message => internalError(message, exports.REGISTERED_EMAIL_ERROR);

exports.DOMAIN_EMAIL_ERROR = 'domain_email_error';
exports.domainEmailError = message => internalError(message, exports.DOMAIN_EMAIL_ERROR);
