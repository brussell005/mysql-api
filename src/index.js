
// requiring these modules
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const inventoryRoutes = require('./routes/inventory.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const {error404, error500} = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow websites to talk to our API service.
app.use(cors());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Partial API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/inventory', inventoryRoutes); // http://localhost:3000/inventory


// app.use('/users', usersRoutes); // http://localhost:3000/users

// Handle 404 requests
app.use(error404); // http://loaclhost:3000/users

// Handle 500 requests - applies mostly to live services
app.use(error500);

// listen on server port
app.listen(port, function() {
  console.log(`We are listening at: ${port}...`);
});