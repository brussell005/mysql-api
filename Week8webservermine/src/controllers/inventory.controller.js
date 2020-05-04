const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_ITEMS,
  SINGLE_ITEM,
  INSERT_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} = require('../queries/inventory.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');



exports.getALLITEMS= async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all items
  const items = await query(con, ALL_ITEMS(req.user.id), []).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!items.length) {
    res.status(200).json({ msg: 'No items available for this user.' });
  }
  res.json(items);
};

// http://localhost:3000/tasks/1
exports.getSINGLEITEM = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all task
  const items = await query(
    con,
    SINGLE_ITEM(req.user.id, req.params.inventoryId)
  ).catch(serverError(res));

  if (!items.length) {
    res.status(400).json({ msg: 'No items available for this user.' });
  }
  res.json(task);
};

// http://localhost:3000/tasks
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.insertITEM = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add task
    const itemName = mysql.escape(req.body.item_name);
    const result = await query(con, INSERT_ITEM(user.id, itemName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add task: ${req.body.item_name}` });
    }
    res.json({ msg: 'Added task successfully!' });
  }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "task_name = \'Task 1\', status = \'complete\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [task_name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 task name'
  );

  values.push(`created_date = NOW()`); // update current date and time
  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateITEM = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update task
  const result = await query(
    con,
    UPDATE_ITEM(req.user.id, req.params.inventoryId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update task: '${req.body.item_name}'` });
  }
  res.json(result);
};

// http://localhost:3000/tasks/1
exports.deleteITEM= async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete task
  const result = await query(
    con,
    DELETE_ITEM(req.user.id, req.params.inventoryId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete task at: ${req.params.inventoryId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};
