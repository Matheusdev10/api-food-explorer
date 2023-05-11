exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.text('user_id').references('id').inTable('users');
  });

exports.down = (knex) => knex.schema.dropTable('products');
