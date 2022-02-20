const passport = require("passport");
const { sendError, errors } = require("../utils/errors");

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return sendError(res, errors.NOT_LOGGED_IN);
  }
  return next();
}

function Authenticate(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err)
      return next(err);
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = {
  isAuthenticated,
  Authenticate,
}
