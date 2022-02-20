const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const config = require("./utils/config");
const { sendError, errors } = require("./utils/errors");
const { Authenticate } = require("./middleware/auth");

function normalRoutes(app) {
  const router = express.Router();
  router.use(Authenticate)

  router.use("/data", require('./routes/data'));

  app.use(router);
}

async function bootstrap() {
  // db setup
  await new Promise((resolve, reject) => mongoose.connect(config.mongoDbConnectionString, {}, (err) => {
    err ? reject(err) : resolve();
  }))

  // before routes setup
  const app = express();
  require('./utils/passport');
  app.use(express.json());
  
  // routes
  app.use(require('./routes/auth'))
  normalRoutes(app);

  // error handling
  app.use(function(err, req, res, next) {
    return sendError(res, errors.UNKNOWN_ERROR);
  });
  app.use(function(req, res, next) {
    return sendError(res, errors.NO_ENDPOINT);
  });

  // listen
  app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
  })
}

bootstrap();
