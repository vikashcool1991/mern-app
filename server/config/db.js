const mongoose = require('mongoose');
const path = require('path');
const MongoMemoryServer = require('mongodb-memory-server').default;
const bluebirdPromise = require('bluebird');

let MONGO_URL = 'mongodb://localhost:27017/sample';
// let MONGO_URL = 'mongodb://mongo:27019/sample';
const label = { label: path.basename(__filename) };

module.exports = {
  connect: async () => {
    try {
      mongoose.Promise = bluebirdPromise;
      if (process.env.NODE_ENV === 'test') {
        const mongoServer = new MongoMemoryServer({
          instance: {
            port: 27019,
            dbName: 'sample',
          },
        });
        MONGO_URL = await mongoServer.getConnectionString();
      }
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      logger.info('Mongodb connected.', label);
    } catch (err) {
      logger.error('MongoDB connection ERROR.', label);
      logger.error(err.stack, label);
      process.exit();
    }
  },
};