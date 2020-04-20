const express = require('express');
const {
  getALLITEMS,
  getSINGLEITEM,
  insertITEM,
  updateITEM,
  deleteITEM,
} = require('../controllers/inventory.controller');
const canAccess = require('../middleware/auth.middleware');

const inventoryRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
inventoryRoutes.get('/', canAccess, getALLITEMS).post('/', canAccess, insertITEM);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
inventoryRoutes
  .get('/:inventoryId', canAccess, getSINGLEITEM) // GET http://locahost:3000/tasks/1
  .put('/:inventoryId', canAccess, updateITEM)
  .delete('/:inventoryId', canAccess, deleteITEM);

module.exports = inventoryRoutes;
