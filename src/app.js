/* eslint-disable no-tabs */
/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const mongooseConfig = require('./config/mongoose');
const logger = require('./utils/logger');
const indexRoutes = require('./routes/index.routes');

const app = express();
// Set up Express components.
app.use(morgan('combined', { stream: logger.stream }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// enable cors
app.use(helmet());
app.use(cors());

// Serve the files statically from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// Serve dynamic API routes with '/api/' path prefix.
app.get('/', (req, res) => res.render('home'));
app.use('/api/v1', indexRoutes);
app.use((err, req, res, next) => {
	if (err && err.error && err.error.isJoi) {
		return res.status(400).json({
			type: err.type,
			message: err.error.toString(),
		});
	}
	if (err && err.error) {
		return res.status(err.status || 400).send({
			error: err.error,
			message: err.message || err.error,
		});
	}
	next(err);
});
app.use((req, res) => res.status(404).send('ROUTE NOT FOUND.'));

async function dbConnect() {
	try {
		await mongooseConfig.connectToServer();
		// saleforceClientQueue.queue.add({ date: new Date() });
		console.log('connected now to mongo db');
	} catch (error) {
		console.log('error in mongo connection', error);
	}
}

dbConnect();

module.exports = { app };
