const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const _ = require('lodash');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { connect: MongoConnection } = require('./utils/db');
const { createCustomers } = require('./utils/seed');
const corsOptions = require('./config/cors');

(async () => {
  await MongoConnection();
  await createCustomers();
})();
const logger = require('./logger/winston');
const routes = require('./routes');

const label = { label: path.basename(__filename) };

const app = express();

logger.stream = {
  write(message) {
    logger.info(message, label);
  },
};
global.logger = logger;
global._ = _;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.options('/api/v1', cors(corsOptions));
app.use('/api/v1', cors(corsOptions), routes.v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  logger.error(error, label);
});

module.exports = app;