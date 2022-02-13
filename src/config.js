const path = require('path');
const envFile = getEnvironmentFile();

require('dotenv').config({
  path: envFile,
});

function getEnvironmentFile() {
  if (process.env.ENV_FILE) {
    return path.resolve(__dirname, `../${process.env.ENV_FILE}`)
  }

  if (process.env.NODE_ENV === 'development') {
    return path.resolve(__dirname, `../.env.development`)
  }

  return path.resolve(__dirname, `../.env`)
}

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  PORT,
  NODE_ENV,
  // Database
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

// Stop system if all required environment not specified
if (!DB_HOST) throw new Error('DB_HOST environment is required');
if (!DB_PORT) throw new Error('DB_PORT environment is required');
if (!DB_NAME) throw new Error('DB_NAME environment is required');
if (!DB_USER) throw new Error('DB_USER environment is required');
// if (!DB_PASSWORD) throw new Error('DB_PASSWORD environment is required');

module.exports = ({
  NODE_ENV,
  PORT,
  
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,

  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
});
