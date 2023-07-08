const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res
        .status(401)
        .json({ error: `No User found with email ${email}` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      data: { user: user.email },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
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

    res.status(201).json({
      message: "User registered successfully",
      data: { user: user.email },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserController = async (req, res) => {

  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findById(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.json({ message: "User updated successfully", status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginHandler, registerUser, updateUserController };
