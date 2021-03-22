require('dotenv').config();

const development = {
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  host: process.env.DEV_DB_HOSTNAME,
  port: process.env.DEV_DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  logging: console.log,
  benchmark: true
};
const test = {
  username: process.env.CI_DB_USERNAME,
  password: process.env.CI_DB_PASSWORD,
  database: process.env.CI_DB_NAME,
  host: process.env.CI_DB_HOSTNAME,
  port: process.env.CI_DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const production = {
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
  host: process.env.PROD_DB_HOSTNAME,
  port: process.env.PROD_DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  logging: parseInt(process.env.SQL_LOGGING) === 1 ? console.log : false,
  benchmark: parseInt(process.env.SQL_BENCHMARK) === 1 ? true : false,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = {
  development,
  test,
  production,
};
