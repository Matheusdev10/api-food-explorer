const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
class ProductsController {
  async create(request, response) {
    const { name, img, category, description, price } = request.body;

    const database = await sqliteConnection();

    await database.run(
      'INSERT INTO products (name, img, category, description, price) VALUES(?, ?, ?, ?, ?)',
      [name, img, category, description, price]
    );
    return response.status(201).json();
  }
}

module.exports = ProductsController;
