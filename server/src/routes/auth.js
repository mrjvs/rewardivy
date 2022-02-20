const config = require("../utils/config");
const express = require("express");
const jwt = require("jsonwebtoken");
const { sendError, errors, sendData } = require("../utils/errors");
const passport = require("passport");
const router = express.Router();

router.get("/auth/discord", passport.authenticate("discord"));
router.get("/auth/discord/callback", (req, res, next) => {
  passport.authenticate("discord", async (err, user, info) => {
    try {
      if (err || !user) {
        return sendError(res, errors.UNKNOWN_ERROR);
      }

      req.login(
        user,
        { session: false },
        async (error) => {
          if (error)
            return sendError(res, errors.UNKNOWN_ERROR);

          const body = { _id: user._id };
          const token = jwt.sign({ user: body }, config.authSecret);

          const url = new URL(config.clientUrl);
          url.pathname = "/token";
          url.searchParams.append("token", token);
          return res.redirect(url.toString());
        }
      );
    } catch (error) {
      return sendError(res, errors.UNKNOWN_ERROR);
    }
  })(req, res, next)
});

module.exports = router;
