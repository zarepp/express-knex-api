/** @typedef {import('knex').Knex} Knex */

/**
 * 
 * @param {Knex} knex 
 */
exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

/**
 * 
 * @param {Knex} knex 
 */
exports.down = function (knex) {
  return knex.schema
    .raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
