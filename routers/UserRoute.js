const express = require('express');
const router = express.Router();
const {getUser , updateUser  , deleteUser , folloUser , unFollowUser} = require("../controllers/UserController")

router.get("/:id" , getUser)
router.put("/:id" , updateUser );
router.delete("/:id" , deleteUser)
router.put("/:id/follow" , folloUser);
router.put("/:id/unfollow" , unFollowUser);


module.exports = router