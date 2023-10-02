const express = require("express");
const userController = require("../controllers/userController.js");
const { signup, login } = userController;
const userAuth = require("../middleware/userAuth.js");

const router = express.Router();

router.post("/signup", userAuth.saveUser, signup);
router.post("/login", login);

module.exports = router;
