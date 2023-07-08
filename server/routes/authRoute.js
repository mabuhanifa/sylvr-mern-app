const {
  registerUser,
  loginHandler,
  updateUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.route("/login").post(loginHandler);

router.route("/register").post(registerUser);

router.route("/update").patch(authMiddleware, updateUserController);

module.exports = router;
