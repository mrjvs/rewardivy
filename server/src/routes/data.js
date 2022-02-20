const express = require("express");
const { sendData } = require("../utils/errors");
const { isAuthenticated } = require("../middleware/auth");
const { User } = require("../models/User");
const router = express.Router();

router.get("/test", isAuthenticated, async (req, res) => {
  console.log("oof")
  const user = await User.findById(req.user._id);
  return sendData(res, {
    data: user.data,
  });
});

module.exports = router;
