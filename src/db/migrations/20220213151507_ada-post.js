/** @typedef {import('knex').Knex} Knex */

/**
 * 
 * @param {Knex} knex 
 */
 exports.up = function (knex) {
    return knex.schema
      .createTable('post', table => {
        table
          .uuid('id')
          .primary() // this represents the primary key.
          .notNullable()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username').unique();
        table.string('title');
        table.string('content');
        table.timestamps(true, true);
      });
  };
  
  /**
   * 
   * @param {Knex} knex 
   * @returns 
   */
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('post');
  };
  