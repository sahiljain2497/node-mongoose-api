const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const UserModel = require('../models/User');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, ((jwtPayload, done) => {
  UserModel.findOne({ _id: jwtPayload.id }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  fbGraphVersion: 'v3.0',
}, ((accessToken, refreshToken, profile, done) => {
  console.log('facebook profile');
  UserModel.findOrCreate({
    facebookId: profile.id,
    email: profile.email,
    fullName: `${profile.givenName} ${profile.familyName}`,
  }, (error, user) => {
    console.log('error', error);
    done(error, user);
  });
})));

passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, ((accessToken, refreshToken, profile, done) => {
  console.log('google profile');
  UserModel.findOrCreate({
    googleId: profile.id,
    email: profile.email,
    fullName: `${profile.givenName} ${profile.familyName}`,
  }, (err, user) => done(err, user));
})));

module.exports = passport;
