/* eslint-disable no-console */
const path = require('path');
const Customers = require('../models/customers');
const { randomIntInRange } = require('./common');

const label = { label: path.basename(__filename) };

module.exports = {
  async createCustomers() {
    const date = new Date();
    console.time(`${date.toISOString()} info [${label.label}] Time taken by createCustomers function`);
    const customersData = await Customers.find({});
    if (customersData.length) {
      logger.info('Customer Data exist, seeding skipped.', label);
      console.timeEnd(`${date.toISOString()} info [${label.label}] Time taken by createCustomers function`);
      return null;
    }
    const template = i => ({
      employeeId: `EMP000${i}`,
      name: `test${i}`,
      age: {
        years: randomIntInRange(20, 60),
        months: randomIntInRange(0, 11),
      },
      sex: ['Male', 'Female', 'other'][randomIntInRange(0, 2)],
      addresses: [{
        address: `address${i}`,
        pincode: `pincode${i}`,
        state: `state${i}`,
        city: `city${i}`,
        country: `country${i}`,
        landmark: `landmark${i}`,
        houseNumber: `houseNumber${i}`,
        streetName: `streetName${i}`,
      }],
    });
    const customers = [];
    for (let i = 1; i <= 100; i += 1) {
      customers.push((new Customers(template(i))).save());
    }
    await Promise.all(customers);
    logger.info('Customer Data seeding done.', label);
    console.timeEnd(`${date.toISOString()} info [${label.label}] Time taken by createCustomers function`);
    return null;
  },
};