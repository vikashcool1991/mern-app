const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

const label = { label: path.basename(__filename) };

const {
  format,
} = winston;
const {
  combine,
  timestamp,
  json,
} = format;

const logRoot = process.cwd();

const LOGDIRECTORY = 'log-files';
const LOGDIRECTORYROOT = path.join(logRoot, LOGDIRECTORY);

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `${LOGDIRECTORYROOT}/%DATE%-mern.log`,
  datePattern: 'YYYY-MM-DD',
});

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    format.splat(),
    format.simple(),
    json(),
    format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
  ),
  transports: [
    new (winston.transports.Console)({
      prettyPrint: true,
    }),
    new winston.transports.File({
      filename: path.join(LOGDIRECTORYROOT, 'mern.log'),
      prettyPrint: false,
      maxsize: 5242880, // 5MB
      dailyRotateFileTransport,
    }),
  ],
  level: 'silly',
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message, label);
  },
};

global.logger = logger;

function apiEndpointLogger(app) {
  app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: logger.stream }));
}

module.exports = apiEndpointLogger;