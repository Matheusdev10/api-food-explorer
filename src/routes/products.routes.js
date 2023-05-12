const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();
const multer = require('multer');
const multerConfig = require('../config/multer');

const productsRoutes = Router();

productsRoutes.post(
  '/',
  multer(multerConfig).single('img'),
  productsController.create
);

module.exports = productsRoutes;
