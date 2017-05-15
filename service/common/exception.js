'use strict';
const restify = require('restify');

/**
 * dbconnectionerror    - Sends the error on database connection failure
 * @param message       - Error Message
 */
function dbConnectionError(msg) {
  const message = msg || 'Unable to connect to database!';
  const error   = new restify.RequestTimeoutError(message);
  return formatError(error);
}

function queryExecutionError(msg) {
  const message = msg || 'Unable to Fetch Data';
  const error   = new restify.PreconditionFailedError(message);
  //console.log(JSON.stringify(error));
  return formatError(error);
}

function unAuthorisedError(msg) {
  const message = msg || 'Route Not Allowed';
  const error   = new restify.UnauthorizedError(message);
  //console.log(JSON.stringify(error));
  return formatError(error);
}

function formatError(error){
  return {
    resultCode: "1",
    statusCode: error.statusCode,
    message: error.message
  };
};
//function dbConnectionError() {
//  const statusCode = 503;
//  const message    = 'Unable to connect to database!';
//  return {success: false, data: message, status: statusCode};
//}
//
//function dbConnectionErrorWithMsg(msg) {
//  const statusCode = 503;
//  const message    = 'Unable to connect to database!';
//  return {success: false, data: message, status: statusCode};
//}
//

module.exports.dbConnectionError   = dbConnectionError;
module.exports.queryExecutionError = queryExecutionError;
module.exports.unAuthorisedError = unAuthorisedError;
//module.exports.dbConnectionErrorWithMsg = dbConnectionErrorWithMsg;