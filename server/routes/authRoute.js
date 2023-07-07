const { loginController } = require("../controllers/authController");

const router = require("express").Router();

router.route("/login").post(loginController);

module.exports = router;