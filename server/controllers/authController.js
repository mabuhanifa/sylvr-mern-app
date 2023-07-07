const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginController = async (req, res) => {
  try {
    const { name } = req.body;

    res.send(`Hello ${name}`);
  } catch (error) {
    res.send({ error });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { registerUser };

module.exports = { loginController };
