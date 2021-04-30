const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);
const redisPort = 6379;
let _client;

function connectRedis() {
  _client = redis.createClient(redisPort);
  _client.on('error', (err) => {
    console.log(err);
  });
  return _client;
}

const getClient = () => _client;

module.exports = { connectRedis, getClient };
