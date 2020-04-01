const con = require('../db-config');
const queries = require('../queries/inventory.queries');



exports.getALLINVENTORY = function(req, res) {
  con.query(queries.all_inventory, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.getSINGLEITEM = function(req, res) {
  con.query(queries.single_item, [req.params.inventoryid], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.createITEM = function(req, res) {
  con.query(queries.insert_item, [req.body.name], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
  });
};


exports.updateITEM = function(req, res) {
  con.query(
    queries.update_item,
    [req.body.name, req.body.defintion, req.body.quantity, req.params.inventoryid],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};


exports.deleteITEM = function(req, res) {
  con.query(queries.delete_item, [req.params.inventoryid], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'The item has been removed!' });
  });
};