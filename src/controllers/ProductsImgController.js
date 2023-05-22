const DiskStorage = require('../providers/DiskStorage');
const sqliteConnection = require('../database/sqlite');

class ProductsImgController {
  async update(request, response) {
    const imgFileName = request.file.filename;
    const database = await sqliteConnection();
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(imgFileName);

    await database.run('INSERT INTO products (img) VALUES (?)', [filename]);
    return response.status(201).json();
  }
}

module.exports = ProductsImgController;
