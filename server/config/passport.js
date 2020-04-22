const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User, getUserByUsername, comparePassword } = require('../models/users');

module.exports = {
  init() {
    passport.use(new LocalStrategy(
      async (username, password, done) => {
        try {
          const user = await getUserByUsername(username);
          if (!user) {
            return done({
              message: 'Invalid Username',
            }, false);
          }
          const isMatch = await comparePassword(password, user.password);
          if (isMatch) {
            return done(null, user);
          }
          return done({
            message: 'Invalid password',
          }, false);
        } catch (err) {
          logger.error(err.stack);
          throw err;
        }
      },
    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findOne({ _id: id }).exec();
        if (!user) {
          return done(new Error('user not found.'));
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    });
  },
};