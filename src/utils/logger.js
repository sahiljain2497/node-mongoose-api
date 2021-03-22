const winston = require('winston');
const appRoot = require('app-root-path');

const transports = [
	new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' }),
	new winston.transports.File({ filename: `${appRoot}/logs/combined.log` })
];

if (parseInt(process.env.ENABLE_CONSOLE_LOGS) === 1) {
	transports.push(new winston.transports.Console({ format: winston.format.simple() }));
}

// Create a logger based on the log level in config.json
const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,
	transports,
	exitOnError: false,
});

logger.stream = {
	// Write the text in 'message' to the log.
	write: (message) => {
		// Removes double newline issue with piping morgan server request
		// log through winston logger.
		logger.info(message.length > 0 ? message.substring(0, message.length - 1) : message);
	},
};

module.exports = logger;
