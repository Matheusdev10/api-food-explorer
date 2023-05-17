const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();
const multer = require('multer');
const multerConfig = require('../configs/multer');

const productsRoutes = Router();

productsRoutes.post(
  '/',
  multer(multerConfig).single('img'),
  productsController.create
);

productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.delete('/:id', productsController.delete);

module.exports = productsRoutes;
