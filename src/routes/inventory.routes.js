const express = require('express');
const {
    getALLINVENTORY,
    getSINGLEITEM,
    createITEM,
    updateITEM,
    deleteITEM,
} = require('../controllers/inventory.controller');
const canAccess = require('../middleware/auth.middleware');

const inventoryRoutes = express.Router();

inventoryRoutes.get('/', canAccess, getALLINVENTORY).post('/', canAccess, createITEM);

inventoryRoutes
  .get('/inventoryid', canAccess, getSINGLEITEM) // GET http://locahost:3000/tasks/1
  .put('/inventoryid', canAccess, updateITEM)
  .delete('/inventoryid', canAccess, deleteITEM)

  module.exports = inventoryRoutes;


