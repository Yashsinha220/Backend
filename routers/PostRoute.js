const express = require("express");
const router = express.Router();
const {createPost, getPost , updatePost , deletepost, likePost , getTimelinePosts} = require("../controllers/PostControllers")

router.post("/" , createPost)
router.get("/:id" , getPost)
router.put("/:id" , updatePost);
router.delete("/:id" , deletepost);
router.put("/:id/like" , likePost)
router.get(":/id/timeline" , getTimelinePosts)


module.exports = router