require('dotenv').config();
const cors = require('cors');
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { connect: MongoConnection } = require('./config/db');
const { createCustomers } = require('./utils/seed');
const apiEndpointLogger = require('./config/winston');
const routeHandler = require('./routes');
// const { session } = require('./config/middleware');
const { init: passportInit } = require('./config/passport');

const label = { label: path.basename(__filename) };
const { SESSION_SECRET } = process.env;
const app = express();

global._ = _;

(async () => {
  await MongoConnection(app);
  await createCustomers();
})();

app.use(cors({ optionsSuccessStatus: 200 }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// api url request logger
apiEndpointLogger(app);

// compresses response
app.use(compression());

// api url parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser(SESSION_SECRET));

// stores/manages user sessions
// app.use(session(mongoose.connection));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

// passport configuration and initialisation
passportInit();

// static folder setup for html, css
app.use(express.static(path.join(__dirname, 'client', 'public')));

// express app router handler
routeHandler(app);

// logs any unhandled exceptions
process.on('unhandledRejection', (error) => {
  logger.error(error, label);
});

module.exports = app;