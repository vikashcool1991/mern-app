const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const corsOptions = require('../config/cors');

const label = { label: path.basename(__filename) };

function routeHandler(app) {
  try {
    const routesDirectory = path.join(__dirname);
    const contents = fs.readdirSync(routesDirectory);
    contents.forEach((content) => {
      const stat = fs.statSync(path.resolve(routesDirectory, content));
      if (stat.isDirectory()) {
        /* eslint-disable import/no-dynamic-require */
        // eslint-disable-next-line global-require
        const router = require(`./${content}/index.js`);
        app.options(`/api/${content}`, cors(corsOptions));
        app.use(`/api/${content}`, cors(corsOptions), router);
      }
    });
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
  } catch (err) {
    logger.error(err, label);
  }
}

module.exports = routeHandler;