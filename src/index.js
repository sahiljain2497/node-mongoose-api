const { app } = require('./app');
const logger = require('./utils/logger');
const routeprinter = require('./utils/routeprinter');
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

const port = normalizePort(process.env.APP_PORT || 8080);

if (process.env.NODE_ENV === 'development') {
  routeprinter.init(app);
}

app.listen(port, () => {
  logger.info(`App listening on port ${process.env.APP_PORT || 8080}`);
});
