const {  registerUser, loginHandler } = require("../controllers/authController");

const router = require("express").Router();

router.route("/login").post(loginHandler);

router.route("/register").post(registerUser);

module.exports = router;