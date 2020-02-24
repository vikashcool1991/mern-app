const { model, Schema } = require('mongoose');

const AddressSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
});

const CustomerSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    years: {
      type: Number,
      required: true,
    },
    months: {
      type: Number,
      required: true,
    },
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'other'],
    required: true,
  },
  addresses: [AddressSchema],
});

const Customers = model('Customers', CustomerSchema);

module.exports = Customers;