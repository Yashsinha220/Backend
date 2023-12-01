const express = require("express");
const router = express.Router();
const {registerUser, loginuser} = require("../controllers/AuthController")

router.post("/register", registerUser);
router.post("/login" , loginuser)


module.exports = router