require('dotenv').config();

const { env } = process;

const dbConfig = require('./database')(env);
const environment = require('./environment')(env);

module.exports = {
  dbConfig,
  environment,
};
