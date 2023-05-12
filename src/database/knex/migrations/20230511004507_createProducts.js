exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.text('img');
    table.text('name');
    table.text('category');
    table.text('description');
    table.integer('price');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('products');
