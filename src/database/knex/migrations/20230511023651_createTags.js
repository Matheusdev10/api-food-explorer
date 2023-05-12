exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('products');
