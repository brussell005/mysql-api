// CREATING DATABASE AND CONNECTING
// Sets up necessary modules and files
const mysql = require('mysql');
const queries = require('./queries/inventory.queries');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'inventory';

// This is making a connection with mysql and we are telling it 
// the host, user, password, and which database. By using the process.env
// above, we can either get this information from the environment or use a 
// default that we set.

const con = mysql.createConnection({
  host,
  user,
  password,
  database
});

// Connect to the database.
con.connect(function(err) {
  if (err) throw err;
  console.log('Successfully Connected');
  
 // Running a query to crete my inventory table. If it works, sends message to console.log
  con.query(queries.CREATE_inventory_TABLE, function(err, result) {
    if (err) throw err;
    console.log('Database was either created or already existed.');
  });
});

module.exports = con;