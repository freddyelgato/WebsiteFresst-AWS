// Importing express, routes, and environment variables
const express = require('express');
const routes = require('./routes');
require('dotenv').config();

// Initializing the express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mounting the validation routes at '/validation'
app.use('/validation', routes);

// Setting the port for the application, using the environment variable if available, or defaulting to 3003
const PORT = process.env.PORT_VALIDATION || 3003;

// Starting the server and logging that the validation service is running
app.listen(PORT, () => {
    console.log(`Validation Service running on port ${PORT}`);
});
