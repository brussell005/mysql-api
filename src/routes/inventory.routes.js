const controllers = require('../controllers/inventory.controller');
const express = require('express');

const inventoryRoutes = express.Router();

inventoryRoutes.get('/', controllers.getALLINVENTORY).post('/', controllers.createITEM);


inventoryRoutes
  .get('/inventoryId', controllers.getSINGLEITEM) 
  .put('/inventoryId', controllers.updateITEM)
  .delete('/inventoryID', controllers.deleteITEM);

module.exports = inventoryRoutes;