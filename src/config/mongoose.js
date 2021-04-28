const mongoose = require('mongoose');
const logger = require('../utils/logger');

let _db;

module.exports = {
  connectToServer() {
    return new Promise((resolve, reject) => {
      // print mongoose logs in dev env
      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }
      mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = mongoose.connection;
      db.on('error', () => {
        console.error.bind(console, 'connection error:');
        reject('connection fail');
      });
      db.once('open', () => {
        // we're connected!
        resolve(db);
      });
    });
  },
  getDb() {
    return _db;
  },

};
