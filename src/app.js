/* eslint-disable no-tabs */
/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const mongooseConfig = require('./config/mongoose');
const logger = require('./utils/logger');
const indexRoutes = require('./routes/index.routes');
const adminRoutes = require('./routes/admin.routes');

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

// for admin panel
const redis = require('./config/redis');

const rediscli = redis.connectRedis();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
// Serve the files statically from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
	secret: 'SNJ*hdd0q00123123',
	// eslint-disable-next-line new-cap
	store: new redisStore({
		host: '127.0.0.1',
		port: 6379,
		client: rediscli,
		ttl: 86500,
	}),
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// end for admin panel
app.use((req, res, next) => {
	res.setHeader(
		'Content-Security-Policy',
		"default-src *; img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *",
	);
	next();
});
// Serve dynamic API routes with '/api/' path prefix.
app.get('/', (req, res) => res.render('home'));
app.use('/api/v1', indexRoutes);
app.use('/admin', adminRoutes);
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
