const express = require('express'); // Import express for routing and handling HTTP requests
const cors = require('cors'); // Import CORS to enable cross-origin resource sharing (useful for making requests from different domains)
const loginRoutes = require('./routesLogin/routes'); // Import the login routes (from the file where login logic is defined)

const app = express(); // Create an instance of an Express application
app.use(cors()); // Enable CORS for all routes to allow requests from different origins
app.use(express.json()); // Use express's built-in middleware to parse JSON bodies in incoming requests
app.use('/login', loginRoutes); // Register the login routes, so all requests to '/login' will be handled by the routes defined in './routesLogin/routes'

app.listen(3001, () => console.log('Login Service running on port 3001')); // Start the server on port 3001 and log a message when it's up
