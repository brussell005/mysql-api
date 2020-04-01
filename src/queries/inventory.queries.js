// creating my inventory table

exports.CREATE_inventory_TABLE = `CREATE TABLE IF NOT EXISTS inventory(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL, 
  definition varchar(255) DEFAULT 'veg', 
  quantity int DEFAULT 1,
  PRIMARY KEY (id)
)`;

// get every item in inventory
exports.all_inventory = `SELECT * FROM inventory`;

// Get a single item from inventory
exports.single_item = `SELECT * FROM inventory WHERE id = ?`;

// insert into inventory a new item
exports.insert_item = `INSERT INTO inventory (name) VALUES (?)`;

// update item with new name and type
exports.update_item = `UPDATE inventory SET name = ?, definition = ? WHERE id = ?`;

// Delete an item from inventory by id
exports.delete_item = `DELETE FROM inventory WHERE id = ?`;