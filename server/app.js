const path = require('path');
const _ = require('lodash');
const express = require('express');
const cookieParser = require('cookie-parser');
const { connect: MongoConnection } = require('./utils/db');
const { createCustomers } = require('./utils/seed');
const apiEndpointLogger = require('./config/winston');
const routeHandler = require('./routes');

const label = { label: path.basename(__filename) };
const app = express();

global._ = _;

(async () => {
  await MongoConnection();
  await createCustomers();
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// api url request logger
apiEndpointLogger(app);

// api url parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// static folder setup for html, css
app.use(express.static(path.join(__dirname, 'public')));

// express app router handler
routeHandler(app);

// logs any unhandled exceptions
process.on('unhandledRejection', (error) => {
  logger.error(error, label);
});

module.exports = app;