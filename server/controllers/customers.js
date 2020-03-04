/* eslint-disable no-console */
const path = require('path');
const Customers = require('../models/customers');

const label = { label: path.basename(__filename) };

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
const getCustomers = async (req, res, next) => {
  try {
    const date = new Date();
    console.time(`${date.toISOString()} info [${label.label}] Time taken by getCustomers function`);
    const { id: _id } = req.params;
    const query = _id ? { _id } : {};
    const data = await Customers.find(query);
    console.timeEnd(`${date.toISOString()} info [${label.label}] Time taken by getCustomers function`);
    res.status(200).json({ data });
  } catch (error) {
    logger.error(error.stack, label);
    next(error);
  }
};

const createCustomers = async (req, res, next) => {
  try {
    const date = new Date();
    console.time(`${date.toISOString()} info [${label.label}] Time taken by createCustomers function`);
    const bodyParams = req.body;
    const customer = new Customers(bodyParams);
    const data = await customer.save();
    console.timeEnd(`${date.toISOString()} info [${label.label}] Time taken by createCustomers function`);
    res.status(201).json({ data });
  } catch (error) {
    logger.error(error.stack, label);
    next(error);
  }
};

const updateCustomers = async (req, res, next) => {
  try {
    const date = new Date();
    console.time(`${date.toISOString()} info [${label.label}] Time taken by updateCustomers function`);
    const bodyParams = req.body;
    const { id: _id } = req.params;
    const data = await Customers.updateOne({ _id }, { $set: bodyParams });
    console.timeEnd(`${date.toISOString()} info [${label.label}] Time taken by updateCustomers function`);
    res.status(200).json({ data });
  } catch (error) {
    logger.error(error.stack, label);
    next(error);
  }
};

const deleteCustomers = async (req, res, next) => {
  try {
    const date = new Date();
    console.time(`${date.toISOString()} info [${label.label}] Time taken by deleteCustomers function`);
    const { id: _id } = req.params;
    const data = await Customers.remove({ _id });
    console.time(`${date.toISOString()} info [${label.label}] Time taken by deleteCustomers function`);
    res.status(200).json({ data });
  } catch (error) {
    logger.error(error.stack, label);
    next(error);
  }
};

module.exports = {
  getCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers,
};