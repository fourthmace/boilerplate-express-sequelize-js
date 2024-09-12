// LOAD LIBS
const router = require("express").Router();

// CONTROLLERS
const AuthController = require("../controllers/AuthController");

// VALIDATORS
const { mapperV1 } = require('../validators/ErrorsMapper');
const { loginRules } = require('../validators/AuthRules');

// ROUTE DEFINE
router.post("/auth/login", loginRules(), mapperV1, AuthController.login);

module.exports = router;