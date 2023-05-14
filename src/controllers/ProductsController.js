const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
class ProductsController {
  async create(request, response) {
    const { img, name, category, tags, price, description } = request.body;

    const products_id = await knex('products').insert({
      img,
      name,
      category,
      tags,
      price,
      description,
    });

    const tagsInsert = tags.map((name) => {
      return {
        products_id,
        name,
      };
    });
    await knex('tags').insert(tagsInsert);

    return response.json();
  }
  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();
    return response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex('products').where({ id }).delete();
    return response.json();
  }

  async index(request, response) {
    const { name } = request.query;
    const products = await knex('products')
      .whereLike('name', `%${name}%`)
      .orderBy('name');
    return response.json({ products });
  }
}

module.exports = ProductsController;

// await knex('tags').insert(tagsInsert);
// const database = await sqliteConnection();
// await database.run(
//   'INSERT INTO products (name, img, category, description, price) VALUES(?, ?, ?, ?, ?)',
//   [img, name, category, tags, price, description]
// );
