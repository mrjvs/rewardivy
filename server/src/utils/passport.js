const passport = require('passport');
const config = require('./config');
const { Strategy, Scope } = require('@oauth-everything/passport-discord');
const { User } = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

/* serialization */
passport.serializeUser((user, done) => {
  console.log(1)
  done(null, user._id);
})
passport.deserializeUser((id, done) => {
  console.log(2)
  User.findById(id).then(v=> {
    done(null, v);
  }).catch(err => {
    done(err);
  })
});

/* discord strategy */
passport.use(new Strategy(
  {
    clientID: config.discord.clientId,
    clientSecret: config.discord.clientSecret,
    callbackURL: `${config.host}/auth/discord/callback`,
    scope: [Scope.IDENTIFY]
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // check for existing profile
      const user = await User.findById(User.GetDiscordId(profile.id));
      if (user)
        return cb(null, user);
      
      // no existing profile, create new
      const newUser = new User({
        _id: User.GetDiscordId(profile.id)
      })
      await newUser.save();
      return cb(null, newUser);
    } catch (err) {
      cb(err);
    }
  }
));

/* jwt strategy to read session from jwt */
passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.authSecret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      console.log("test")
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);