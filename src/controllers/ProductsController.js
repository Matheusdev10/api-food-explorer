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

    const arrayTags = tags.split(', ');

    const tagsInsert = arrayTags.map((name) => {
      return {
        products_id: products_ids[0],
        name,
      };
    });

    await knex('tags').insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();
    const tags = await knex('tags').where({ products_id: id }).orderBy('name');
    return response.json({
      ...product,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex('products').where({ id }).delete();
    return response.json();
  }

  async index(request, response) {
    // const { name } = request.query;

    const productsTags = await knex('tags')
      .select([
        'products.img',
        'products.id',
        'products.name',
        'products.description',
        'products.tags',
      ])
      .innerJoin('products', 'products.id', 'tags.products_id');

    // const products = await knex('products')
    //   .whereLike('name', `%${name}%`)
    //   .orderBy('name');
    return response.json({ productsTags });
  }
}

module.exports = ProductsController;
