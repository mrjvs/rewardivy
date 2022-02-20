const { sendError, errors } = require("../utils/errors");

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return sendError(res, errors.NOT_LOGGED_IN);
  }
  return next();
}

module.exports = {
  isAuthenticated,
}
