const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    console.log(user);

    const token = req.headers.authorization;

    console.log(token);

    if (!user) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    res.send({ user, token });
  } catch (error) {
    res.send(error);
  }
};

module.exports = authMiddleware;
