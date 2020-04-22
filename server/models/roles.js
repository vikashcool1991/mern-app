const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  description: {
    type: String,
  },
  permissions: [{
    type: Schema.ObjectId,
    ref: 'Permissions',
  }],
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  manages: [{
    type: Schema.ObjectId,
    ref: 'Roles',
  }],
}, {
  timestamps: true,
});

const Roles = model('Roles', RoleSchema);

module.exports = {
  Roles,
};