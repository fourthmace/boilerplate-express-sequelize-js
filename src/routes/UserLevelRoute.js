// LOAD LIBS
const router = require("express").Router();

// CONTROLLERS
const UserLevelController = require("../controllers/UserLevelController");

// MIDDLEWARES
const authMiddleware = require('../middlewares/authMiddleware');

// ROUTE DEFINE
router.get("/user_level/all", authMiddleware(['superadmin']), UserLevelController.getAll);

module.exports = router;