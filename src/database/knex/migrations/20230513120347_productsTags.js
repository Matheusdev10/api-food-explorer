exports.up = (knex) =>
  knex.schema.createTable('productsTags', (table) => {
    table.increments('id');
    table.integer('products_id').references('id').inTable('products');
    table.integer('tags_id').references('id').inTable('tags');
  });

exports.down = (knex) => knex.schema.dropTable('productsTags');
