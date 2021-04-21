require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./utils/logger');
const indexRoutes = require('./routes/index.routes');
const adminRoutes = require('./routes/admin.routes');
const db = require('./models');

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
app.use(express.static(path.join(__dirname, '../public')));

// Serve dynamic API routes with '/api/' path prefix.
app.get('/', (req, res) => res.send('WELCOME TO API HOME.'));
app.use('/api/v1', indexRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use((req, res) => res.status(404).send('ROUTE NOT FOUND.'));

db.sequelize.authenticate().then(() => {
	logger.info('sequelize db connected');
}).catch((error) => {
	logger.error(error);
});

module.exports = { app };
