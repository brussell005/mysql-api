const controllers = require('../controllers/inventory.controller');
const express = require('express');

const inventoryRoutes = express.Router();

inventoryRoutes.get('/', controllers.getALLINVENTORY).post('/', controllers.createITEM);


inventoryRoutes
  .get('/', controllers.getSINGLEITEM) 
  .put('/', controllers.updateITEM)
  .delete('/', controllers.deleteITEM);

module.exports = inventoryRoutes;