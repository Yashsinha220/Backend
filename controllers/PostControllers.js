const Post = require("../models/PostModels");

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
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post.userId === userId) {
      // updating the post data witht the body sent by the client
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPost, getPost, updatePost };
