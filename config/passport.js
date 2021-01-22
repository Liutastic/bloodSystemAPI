const
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  keys = require('../config/keys'),
  mongoose = require('mongoose')
const opts = {}
const User = mongoose.model('users')
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // console.log(passport)
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log(jwt_payload)
    const user = await User.findById(jwt_payload.id)
    // console.log(user)
    if(user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  }));
}