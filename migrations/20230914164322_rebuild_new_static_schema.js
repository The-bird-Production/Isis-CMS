/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema 
    .alterTable('page', (page) => {
        page.boolean('is_static').defaultTo(false)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema 
    .alterTable('page', (page) => {
        page.dropColumn('is_static') 
    })
  
};
