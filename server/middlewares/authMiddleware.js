const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const { email } = req.body;
  try {
    const bearer = req.headers.authorization;

    const token = bearer.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(userId);
    if (!user) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const isAuthorized = user.email === email;

    if (!isAuthorized) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = authMiddleware;
