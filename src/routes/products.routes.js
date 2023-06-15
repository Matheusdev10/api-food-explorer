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

  upload.single('img'),
  ensureAuthenticated,
  productsController.create
);
productsRoutes.get('/', ensureAuthenticated, productsController.index);
productsRoutes.get('/:id', ensureAuthenticated, productsController.show);
productsRoutes.put('/:id', productsController.update);
productsRoutes.patch(
  '/img/:id',
  upload.single('img'),
  ensureAuthenticated,
  productsImgController.update
);
productsRoutes.delete('/:id', ensureAuthenticated, productsController.delete);

module.exports = productsRoutes;
