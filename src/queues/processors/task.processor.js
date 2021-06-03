/* eslint-disable no-await-in-loop */
const logger = require('../../utils/logger');
const mongooseConfig = require('../../config/mongoose');

module.exports = async function (job) {
  const db = await mongooseConfig.connectToServer();
  logger.info('connected to mongoose');
  try {

    job.progress(100);
    db.close();
    return Promise.resolve('complete');
  } catch (error) {
    logger.error('error in job', error);
    return Promise.reject(error);
  }
};
