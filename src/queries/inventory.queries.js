/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `tasks` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_ITEMS_TABLE = `CREATE TABLE IF NOT EXISTS items(
  inventory_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  item_name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'in stock',
  quantity int DEFAULT 1,
  PRIMARY KEY (inventory_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// Get every task
exports.ALL_ITEMS = (userId) => `SELECT * FROM items WHERE user_id = ${userId}`;

// Get a single task by id
exports.SINGLE_ITEM = (userId, inventory_Id) =>
  `SELECT * FROM items WHERE user_id = ${userId} AND inventory_Id = ${inventory_Id}`;

exports.INSERT_ITEM = (userId, item_name) =>
  `INSERT INTO items (user_id, item_name) VALUES (${userId}, ${item_name})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_ITEM= (userId, inventory_Id, newValues) =>
  `UPDATE items SET ${newValues} WHERE user_id = ${userId} AND inventory_Id = ${inventory_Id}`;

// Delete a task by id
exports.DELETE_ITEM = (userId, inventory_Id) =>
  `DELETE FROM items WHERE user_id = ${userId} AND inventory_Id = ${inventory_Id}`;

