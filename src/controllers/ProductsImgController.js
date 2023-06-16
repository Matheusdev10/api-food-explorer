const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class ProductsImgController {
  async update(request, response) {
    const { id } = request.params;

    const imgFileName = request.file.filename;
    console.log(imgFileName);

    const diskStorage = new DiskStorage();

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError('O prato que você deseja editar não existe.', 401);
    }

    // if (product.img) {
    //   await diskStorage.deleteFile(product.img);
    // }

    const filename = await diskStorage.saveFile(imgFileName);

    product.img = filename;

    await knex('products').update(product).where({ id });

    return response.json();
  }
}

module.exports = ProductsImgController;
