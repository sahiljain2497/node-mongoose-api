// we import passport packages required for authentication
const passport = require('passport');
// eslint-disable-next-line import/no-unresolved
const LocalStrategy = require('passport-local').Strategy;
// We will need the models folder to check passport agains
const UserModel = require('../models/User');
//
// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email',
  },
  ((email, password, done) => {
    // When a user tries to sign in this code runs
    UserModel.findOne({ email, role: 'ADMIN' }).then((dbUser) => {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email.',
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      if (!dbUser.comparePassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    }).catch(done);
  }),
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});
//
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;