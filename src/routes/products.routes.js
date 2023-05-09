const { Router } = require('express');
const { products } = require('../products');
const productsRoutes = Router();

productsRoutes.get('/products', (request, response) => {
  response.json(products);
});

module.exports = productsRoutes;
