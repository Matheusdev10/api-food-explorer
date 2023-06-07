const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');

class ProductsController {
  async create(request, response) {
    const { name, category, tags, price, description } = request.body;
    const imgFileName = request.file.filename;
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imgFileName);
    const products_ids = await knex('products').insert({
      img: filename,
      name,
      category,
      tags,
      price,
      description,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const product = await knex('products').where({ id }).first();
    return response.json({
      ...product,
      tags: product.tags.split(','),
      img: `http://localhost:3333/assets/${product.img}`,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex('products').where({ id }).delete();
    return response.json();
  }

  async index(request, response) {
    const products = await knex('products').select([
      'products.img',
      'products.id',
      'products.category',
      'products.name',
      'products.price',
      'products.description',
      'products.tags',
    ]);
    // preciso transformar as tags em um array de tags.
    // o que é tag? (lista de palavra separada por virgula)
    // onde esta a tag? (eu preciso ir no produto para pegar a tag)
    // transformar em um array de string: dividir usando o metodo split para separar as strings

    const productsTags = products.map((product) => ({
      ...product,
      tags: product.tags.split(','),
      img: `http://localhost:3333/assets/${product.img}`,
    }));

    return response.json(productsTags);
  }
}

module.exports = ProductsController;
