const { loginController, registerUser } = require("../controllers/authController");

const router = require("express").Router();

router.route("/login").post(loginController);

router.route("/register").post(registerUser);

module.exports = router;