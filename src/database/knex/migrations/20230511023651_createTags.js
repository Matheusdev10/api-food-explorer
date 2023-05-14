exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.integer('products_id').references('id').inTable('products');
  });

exports.down = (knex) => knex.schema.dropTable('products');
