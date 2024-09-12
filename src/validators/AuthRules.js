// LOAD LIBS
const { body } = require('express-validator');

/**
 * Login Rules
 * ---------------------
 */
const loginRules = () => {
  return [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
  ]
}

module.exports = {
    loginRules,
};
