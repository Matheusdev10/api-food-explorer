const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();
const ProductsImgController = require('../controllers/ProductsImgController');
const productsImgController = new ProductsImgController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);
productsRoutes.post(
  '/',
  ensureAuthenticated,
  upload.single('img'),
  productsController.create
);
productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.delete('/:id', productsController.delete);
productsRoutes.patch(
  '/img',
  ensureAuthenticated,
  upload.single('img'),
  productsImgController.update
);

module.exports = productsRoutes;
