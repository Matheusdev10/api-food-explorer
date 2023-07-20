const { Router, static } = require('express');
const path = require('path');

const { UPLOADS_FOLDER } = require('../configs/upload');

const assetsRoutes = Router();
assetsRoutes.get('/:filePath', (req, res) => {
  const { filePath } = req.params;
  console.log(filePath);
  res.sendFile(path.join(UPLOADS_FOLDER, filePath));
});

module.exports = assetsRoutes;
