// LOAD LIBS
const { validationResult } = require('express-validator');
// HELPERS
const { formatResponse } = require('../helpers/utils')

const mapperV1 = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().reduce((acc, err) => {
    if (!acc[err.path]) {
      acc[err.path] = [];
    }
    acc[err.path].push(err.msg);
    return acc;
  }, {});

  return formatResponse(res, 400, 'invalid request', extractedErrors)
}

module.exports = {
    mapperV1,
};