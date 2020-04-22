const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const crypto = require('crypto');
const path = require('path');
const { sendMail } = require('../utils/email');
// const { Roles } = require('../models/roles');
const { User, createUser } = require('../models/users');
const userHelper = require('../service/users');
const {
  response,
} = require('../utils/responses');

const label = { label: path.basename(__filename) };

module.exports = {
  async signup(req, res) {
    try {
      const {
        name, email, username, password, role: roleName,
      } = req.body;
      body('name', 'Name is required').notEmpty();
      body('email', 'Email is required').notEmpty();
      body('email', 'Email is not valid').isEmail();
      body('username', 'Username is required').notEmpty();
      body('password', 'Password is required').notEmpty();
      //   const role = await Roles.findOne({
      //     name: {
      //       $regex: `^${roleName}$`,
      //       $options: 'i',
      //     },
      //   });
      //   if (!role) {
      //     response(res, null, null, 'Invalid role.', 400);
      //     return null;
      //   }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, errors.array(), null, null, 400);
      }
      const query = {};
      query.$or = [];
      query.$or.push(userHelper.regexQuery('username', `^${username}\\b`));
      query.$or.push(userHelper.regexQuery('email', `^${email}\\b`));
      const user = await User.findOne(query);
      if (user) {
        return response(res, null, null, 'Already registered.', 400);
      }
      const verificationToken = crypto.randomBytes(16).toString('hex');
      // const url = `http://localhost:8000/api/v1/verify?username=${username}&verificationid=${verificationToken}`;
      // const html = `<a href=${url}>verify</a>`;
      // sendMail({
      //     html: html,
      //     to: email
      // });
      const d1 = new Date();
      const d2 = new Date(d1);
      d2.setHours(d1.getHours() + 6);
      const newUser = new User({
        name,
        email,
        username,
        password,
        // roles: role._id,
        verification: {
          isVerified: true, // disabling temporarily for integration
          token: verificationToken,
          tokenExpiry: new Date(d2),
        },
      });
      await createUser(newUser);
      return response(res, null, null, 'Registered Successfully.', 200);
    } catch (err) {
      logger.error(err.stack, label);
      return response(res, err, null, null, 500);
    }
  },

  async verify(req, res) {
    try {
      const { username } = req.query;
      const verificationToken = req.query.verificationid;
      const user = await User.findOne(userHelper.regexQuery('username', `^${username}\\b`));
      if (!user) {
        response(res, null, null, 'no user exists.', 400);
      } else if (user.verification.isVerified) {
        response(res, null, null, 'user already verified', 400);
      } else if (new Date(user.verification.tokenExpiry) < new Date()) {
        response(res, null, null, 'verification token expired.', 400);
      } else if (user.verification.token !== verificationToken) {
        response(res, null, null, 'invalid verification token.', 400);
      } else {
        user.verification.isVerified = true;
        user.isActive = true;
        user.save();
        res.send('<h2>Email Verified successfully.</h2>');
      }
    } catch (err) {
      logger.error(err.stack, label);
      response(res, err, null, null, 500);
    }
  },

  async login(req, res) {
    try {
      passport.authenticate('local', (err, user) => {
        if (err) return response(res, err, null, null, 401);
        if (!user) return response(res, null, null, 'no user found', 401);
        req.login(user, async (_err) => {
          if (_err) return response(res, _err, null, null, 401);
          if (!req.user.verification.isVerified) {
            response(res, null, null, 'email not verified.', 400);
          } else {
            const token = jwt.sign({
              id: req.user.id,
            }, 'server secret', {
              expiresIn: '14d',
            });
            await User.updateOne({ _id: user.id }, { token });
            response(res, null, {
              user: {
                id: user.id, name: user.name, username: user.username, email: user.email, token,
              },
            }, null, 200);
          }
        });
      })(req, res);
    } catch (err) {
      logger.error(err.stack, label);
      response(res, err, null, null, 500);
    }
  },

  async logout(req, res) {
    req.logout();
    await User.updateOne({ _id: req.users._id }, { token: null });
    response(res, null, null, 'Logged out successfully.', 200);
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    User.findOne(userHelper.regexQuery('email', `^${email}\\b`)).then((user) => {
      if (!user) {
        response(res, null, null, 'user not exists.', 400);
      } else if (!user.verification.isVerified) {
        response(res, null, null, 'email not verified.', 400);
      } else {
        const forgotPasswordToken = crypto.randomBytes(16).toString('hex');
        const url = `http://localhost:8000/api/v1/reset-password?email=${user.email}&token=${forgotPasswordToken}`;
        const html = `<p>You requested for a password reset, kindly use this <a href=${url}>link</a> to reset your password</p>`;
        sendMail({
          html,
          to: user.email,
        });
        const d1 = new Date();
        const d2 = new Date(d1);
        d2.setHours(d1.getHours() + 6);
        user.forgotPassword = {
          token: forgotPasswordToken,
          tokenExpiry: new Date(d2),
          isForgotPassword: true,
        };
        user.save();
        response(res, null, null, 'reset password link sent to email.', 200);
      }
    }).catch(err => response(res, err, null, null, 400));
  },

  async getResetPasswordTemplate(req, res) {
    res.sendFile(path.resolve('./templates/reset-password.html'));
  },

  async resetPassword(req, res) {
    const {
      email,
      token,
      newPassword,
      newPassword2,
    } = req.body;
    User.findOne({
      email: {
        $regex: `^${email}\\b`,
        $options: 'i',
      },
      'forgotPassword.token': token,
      'forgotPassword.tokenExpiry': {
        $gt: new Date(),
      },
      'forgotPassword.isForgotPassword': true,
    }).then((user) => {
      if (!user) {
        response(res, null, null, 'token expired.', 400);
      }
      if (user && (newPassword === newPassword2)) {
        user.forgotPassword.token = '';
        user.forgotPassword.tokenExpiry = new Date();
        user.forgotPassword.isForgotPassword = false;
        user.password = newPassword;
        User.createUser(user).then((_user) => {
          response(res, null, null, 'password reset success.', 200);
        });
      } else {
        response(res, null, null, 'password does not match.', 400);
      }
    }).catch(err => response(res, err, null, null, 400));
  },

  async changePassword(req, res) {
    const userId = req.session.passport.user;
    const { oldPassword, newPassword, newPassword2 } = req.body;
    User.findOne({
      _id: userId,
    }).then((user) => {
      User.comparePassword(oldPassword, user.password).then((isMatch) => {
        if (isMatch && (newPassword === newPassword2)) {
          user.password = newPassword;
          User.createUser(user).then((_user) => {
            response(res, null, null, 'password changed.', 200);
          });
        } else {
          res.json({
            message: 'Invalid password',
          });
        }
      });
    }).catch(err => response(res, err, null, null, 400));
  },

};