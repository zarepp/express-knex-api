/** @type import('knex').knex */
const knex = require('knex');
const { camelCase, mapKeys, snakeCase } = require('lodash');
const config = require('../config');
const knexfile = require('./../../knexfile')

const knexConfig = (config.NODE_ENV === 'production')
  ? knexfile.production
  : knexfile.development;

// const db = knex(knexConfig)
const db = knex({
  ...knexConfig,
  // before query
  wrapIdentifier: (value) => {
    // TODO: compare performance difference 
    // check if camelCase then only convert if it is
    // versus
    // just convert everything to snake_case (current approach)

    // return `"${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`).replace(/"/g, '""')}"`;
    return snakeCase(value);
  },
  // after query, the result
  postProcessResponse: (result, queryContext) => {
    // TODO: Handle multi nested object
    if (Array.isArray(result)) {
      return result.map(row => mapKeys(row, (v, k) => camelCase(k)));
    } else {
      return mapKeys(result, (v, k) => camelCase(k));
    }
  }

})

module.exports = db;
