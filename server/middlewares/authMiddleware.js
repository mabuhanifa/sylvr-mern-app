const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({ email });
    const token = req.headers.authorization;
    console.log(token);
    if (!user) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = authMiddleware;
