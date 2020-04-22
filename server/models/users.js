const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const label = { label: path.basename(__filename) };

const settingsSchema = new Schema({
  showNotification: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

const profileSchema = new Schema({
  image: {
    type: Schema.ObjectId,
    ref: 'File',
  },
  phone: {
    type: String,
  },
}, {
  timestamps: true,
});

const verificationSchema = new Schema({
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  tokenExpiry: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const forgotPasswordSchema = new Schema({
  isForgotPassword: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  tokenExpiry: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});
// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  token: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  forgotPassword: forgotPasswordSchema,
  verification: verificationSchema,
  settings: settingsSchema,
  profile: profileSchema,
  roles: {
    type: Schema.ObjectId,
    ref: 'Roles',
  },
}, {
  timestamps: true,
});

const User = model('User', UserSchema);

module.exports = {

  User,

  createUser: async (newUser) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    return newUser.save();
  },

  getUserByUsername: async (username) => {
    try {
      const query = {
        username,
      };
      const user = await User.findOne(query).exec();
      return user;
    } catch (err) {
      logger.error(err.stack, label);
      throw err;
    }
  },

  getUserById: async (id) => {
    const user = await User.findById(id).exec();
    return user;
  },

  comparePassword: async (candidatePassword, hash) => {
    const isSame = await bcrypt.compare(candidatePassword, hash);
    return isSame;
  },

};