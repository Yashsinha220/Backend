const User = require("../models/UserModel");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Registering a new User
const registerUser = async (req, res) => {
  const hashedPassword = await bcrpyt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  const { username } = req.body;

  try {
    const olduser = await User.findOne({ username });
    if (olduser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// login User
const loginuser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }
    const isMatch = await bcrpyt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({user , token});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginuser };
