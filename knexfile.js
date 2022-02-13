// Used .env file for testing production environment in local device
// In production & staging (docker), environment specified in docker-compose file
// require('dotenv').config();

const config = require('./src/config')

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: config.DB_HOST,
      database: config.DB_NAME,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
    },
    migrations: {
      directory: './src/db/migrations/'
    },
    seeds: {
      directory: './src/db/seeds/'
      // seeds-production directory contains must seed data to database
      // directory: './src/db/seeds-production/'
    }
  },

  // Staging is production with different environment value
  production: {
    client: 'postgresql',
    connection: {
      host: config.DB_HOST,
      database: config.DB_NAME,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
      ssl: {
        rejectUnauthorized: false,
        // ca: caFileDataString,
      },
    },
    migrations: {
      directory: './src/db/migrations/'
    },
    seeds: {
      directory: './src/db/seeds/no-such-file-error_to-prevent-mistake-run-on-production'
      // directory: './src/db/seeds/'
      // seeds-production directory contains must seed data to database
      // directory: './src/db/seeds-production/'
    }
  },
};
