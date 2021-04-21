require('dotenv').config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  logging: console.log,
  benchmark: true,
};
const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  logging: parseInt(process.env.SQL_LOGGING) === 1 ? console.log : false,
  benchmark: parseInt(process.env.SQL_BENCHMARK) === 1,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = {
  development,
  test,
  production,
};
