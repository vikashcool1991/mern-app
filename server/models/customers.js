const { model, Schema } = require('mongoose');
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */
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