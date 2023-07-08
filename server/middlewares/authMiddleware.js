const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }

    
  } catch (error) {
    res.send(error);
  }
};

module.exports = authMiddleware;
