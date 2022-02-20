const express = require("express");
const { sendData } = require("../utils/errors");
const { isAuthenticated } = require("../middleware/auth");
const { User } = require("../models/User");
const router = express.Router();

/*
** get data variable
*/
router.get("/@me", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.user._id);
  return sendData(res, {
    data: user.data,
  });
});

/*
** update data variable
*/
router.post("/@me", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.data = JSON.stringify(req.body);
  await user.save();
  return sendData(res, {
    data: user.data,
  });
});

module.exports = router;
