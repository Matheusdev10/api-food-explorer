const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');
const sqliteConnection = require('../database/sqlite');
const AppError = require('../utils/AppError');

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

    return response.json(products_ids);
  }

  async show(request, response) {
    const { id } = request.params;
    const product = await knex('products').where({ id }).first();
    return response.json({
      ...product,
      tags: product.tags.split(','),
      img: product.img,
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
      img: product.img,
    }));

    return response.json(productsTags);
  }

  async update(request, response) {
    const { category, name, price, description, tags } = request.body;
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError('O prato que você está tentando editar não existe!');
    }
    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.tags = tags ?? product.tags;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.updated_at = knex.fn.now();

    await knex('products').where({ id }).update(product);

    return response.status(202).json('Prato atualizado com sucesso');
  }
}

module.exports = ProductsController;
