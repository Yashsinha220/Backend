const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// get a User

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update a User

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      // new : true that i want to get the updated user not the previous user
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json("Access Denied !");
    }
  }
};

// delete user

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(200).json("User Deleted successfully");
    } catch (error) {
      res.status(403).json("Access Denied!");
    }
  }
};

// follow a user

const folloUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidder");
  } else {
    try {
      const followUser = await User.findById(id);
      const currentuser = await User.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        // pushing the id of the following user int  the current user 
        await currentuser.updateOne({ $push: { following: id } });
        res.status(200).json("User Followed");
      }
      else {
        res.status(403).json("Already Followed");
      }
    } catch (error) {}
  }
};


const unFollowUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidder");
  } else {
    try {
      const followUser = await User.findById(id);
      const currentuser = await User.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        // pushing the id of the following user int  the current user 
        await currentuser.updateOne({ $pull:  { following: id } });
        res.status(200).json("User unFollowed");
      }
      else {
        res.status(403).json("User is not followd by you");
      }
    } catch (error) {}
  }
};



module.exports = { getUser, updateUser, deleteUser , folloUser , unFollowUser};
