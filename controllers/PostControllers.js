const { default: mongoose } = require("mongoose");
const Post = require("../models/PostModels");
const User = require("../models/UserModel");

// create new POst
const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);

  try {
    await newPost.save();
    res.status(200).json("Post created successfully");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get a post

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update a post

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      // updating the post data witht the body sent by the client
      await post.updateOne({ $set: req.body });
      res.status(200).json({msg : "post updated successfully"});
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete a post
const deletepost = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({msg : "post deleted successfully"});
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like and dislike a post
const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    //  if the current user id is not included in the likes array than we need to like it else we need to dislike it
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post likes");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post dislikes");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get Timeline posts
const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  // timeline include his own post and the post of the person is following
  try {
    const currentuserPosts = await Post.find({ userId: userId });
    // aggregate is a array of steps
    const followingPosts = await User.aggregate([
      {
        $match: {
          // if simple id is pus
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentuserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {}
};
module.exports = {
  createPost,
  getPost,
  updatePost,
  deletepost,
  likePost,
  getTimelinePosts,
};
