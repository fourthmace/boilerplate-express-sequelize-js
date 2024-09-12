// LOAD LIBS
const { body } = require("express-validator");

/**
 * Create Rules
 * ---------------------
 */
const createRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("user_level_id").notEmpty().withMessage("User Level Id is required"),
  ];
};

/**
 * Update Rules
 * ---------------------
 */
const updateRules = () => {
  return [
    body("user_id").notEmpty().withMessage("User Id is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),
    body("user_level_id").notEmpty().withMessage("User Level Id is required"),
  ];
};

/**
 * Update Profile Rules
 * ---------------------
 */
const updateProfileRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),
  ];
};

module.exports = {
  createRules,
  updateRules,
  updateProfileRules,
};
