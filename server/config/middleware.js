const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');
const path = require('path');

const { User } = require('../models/users');

const { SESSION_SECRET } = process.env;
const label = { label: path.basename(__filename) };

module.exports = {
  session: db => session({
    // name: 'secret',
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
      autoRemove: 'native',
      stringify: false,
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // = 14 days. Default
      sameSite: false,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
    saveUninitialized: false,
    resave: true,
  }),

  isLoggedIn: async (req, res, next) => {
    try {
      // const { token } = req.session;
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const reqToken = req.headers.authorization.split(' ')[1];
        jwt.verify(reqToken, 'server secret', async (error, payload) => {
          try {
            if (error) {
              logger.error(error, label);
              throw new Error('You must be logged in.');
            }
            const user = await User.findById(payload.id);
            if (!user || (user.token !== reqToken)) {
              throw new Error('You must be logged in.');
            } else {
              req.users = user;
              req.token = reqToken;
              next();
            }
          } catch (err) {
            res.status(401).send({
              error: err.message,
            });
          }
        });
      } else {
        throw new Error('You must be logged in.');
      }
    } catch (e) {
      res.status(401).send({
        error: e.message,
      });
    }
  },

  isAuthorized: (req, res, next) => {
    next();
  },
};