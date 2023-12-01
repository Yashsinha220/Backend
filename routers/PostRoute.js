const express = require("express");
const router = express.Router();
const {createPost, getPost , updatePost} = require("../controllers/PostControllers")

router.post("/" , createPost)
router.get("/:id" , getPost)
router.put("/:postId" , updatePost);


module.exports = router