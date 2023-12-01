const User = require("../models/UserModel");
const bcrpyt = require("bcrypt");


// Registering a new User
const registerUser = async (req, res) => {

  const { username, password, firstname, lastname } = req.body;
  const hashedPassword = await bcrpyt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    firstname,
    lastname,
    isadmin: false,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// login User
const loginuser = async(req ,res) =>{
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ msg: "Invalid username or password" });
    }
    const isMatch = await bcrpyt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Invalid username or password" });
    }
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ message : error.message});
  }
}

module.exports = { registerUser , loginuser };
