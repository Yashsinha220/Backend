const express = require("express");
const router = express.Router();
const {
  getforgorPasswordLink,
  getotkenvalidity,
} = require("../controllers/ForgotPassworContorller");

router.get("/", getforgorPasswordLink);

router.get("/validity/", getotkenvalidity);

module.exports = router;
