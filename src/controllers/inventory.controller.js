const con = require('../db-config');
const {
    all_inventory,
    single_item,
    insert_item,
    update_item,
    delete_item,
} = require('../queries/inventory.queries');
const query = require('../utils/query');


exports.getALLINVENTORY = async (req,res) => {
    const con = await connection().catch((err) => {
        throw err;
    });

    const inventory = await query(con, all_inventory).catch((err) => {
        res.send(err);
    });

    if (inventory.length) {
        res.json(inventory);
    }
};

exports.getSINGLEITEM = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    // query all task
    const inventory = await query(con, single_item, [req.params.taskId]).catch(
      (err) => {
        res.send(err);
      }
    );
  
    if (inventory.length) {
      res.json(inventory);
    }
  };


  exports.createITEM = async (req, res) => {
    // verify valid token
    const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
  
    // take result of middleware check
    if (decoded.id) {
      // establish connection
      const con = await connection().catch((err) => {
        throw err;
      });
  
      // query add task
      const result = await query(con, insert_item, [req.body.name]).catch(
        (err) => {
          res.send(err);
        }
      );
      console.log(result);
  
      if (result.affectedRows === 1) {
        res.json({ message: 'Added Item successfully!' });
      }
    }
  };



  exports.updateITEM = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
  
    // query update task
    const result = await query(con, update_item, [
      req.body.name,
      req.body.defintion,
      req.body.quantity,
      req.params.inventoryid,
    ]).catch((err) => {
      res.send(err);
    });
  
    if (result.affectedRows === 1) {
      res.json(result);
    }


  exports.deleteITEM = async (req, res) => {
        // establish connection
        const con = await connection().catch((err) => {
          throw err;
        });
      
        // query delete task
        const result = await query(con, delete_item, [req.params.inventoryId
        ]).catch((err) => {
            res.send(err);
          }
        );
      
        if (result.affectedRows === 1) {
          res.json({ message: 'Deleted successfully.' });
        }
      }
    };
