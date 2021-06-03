/* eslint-disable no-tabs */
/* eslint-disable indent */
const path = require('path');
const Queue = require('bull');
const logger = require('../utils/logger');

class ArgusSync {
  constructor() {
    this.queue = new Queue(`argus_sync_queue_${process.env.NODE_ENV}`, 'redis://127.0.0.1:6379');
    this.addHandlerToQueue();
  }

  addHandlerToQueue() {
    this.queue.process(5, path.join(__dirname, '/processors/argusSync.processor.js'));

    this.queue.on('error', (error) => {
      logger.error('error', error);
    });

    this.queue.on('failed', (job, error) => {
      logger.error('error', error);
    });

    this.queue.on('active', (job) => {
      logger.info('job active for distribution:  ', job.data);
      // A job has started. You can use `jobPromise.cancel()`` to abort it.
    });

    this.queue.on('completed', (job, result) => {
      logger.info('job completed for distribution :  ', job.data);
    });

    this.queue.on('waiting', (jobId) => {
      // A Job is waiting to be processed as soon as a worker is idling.
    });

    this.queue.on('stalled', (job) => {
      // A job has been marked as stalled. This is useful for debugging job
      // workers that crash or pause the event loop.
    });

    this.queue.on('progress', (job, progress) => {
      // A job's progress was updated!
      // db.ContactImports.update({ progress }, { where: { id: job.data.importId } });
    });

    this.queue.on('paused', () => {
      // The queue has been paused.
    });

    this.queue.on('resumed', (job) => {
      // The queue has been resumed.
    });

    this.queue.on('cleaned', (jobs, type) => {
      // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
      // jobs, and `type` is the type of jobs cleaned.
    });

    this.queue.on('drained', () => {
      // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
    });

    this.queue.on('removed', (job) => {
      // A job successfully removed.
    });
  }
}

module.exports = new ArgusSync();
