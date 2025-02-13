const express = require('express'); // Import express to create a server and handle routing
const cors = require('cors'); // Import cors to handle Cross-Origin Resource Sharing
const routes = require('./routesLogout/routes'); // Import the routes for the logout functionality
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create a new express app instance

// Enable CORS with specific configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from the frontend running on this URL
    credentials: true // Enable cookies and authentication headers to be sent with requests
}));

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use('/logout', routes); // Define the route for logout requests, handled by the imported routes

// Set the port for the server, using an environment variable if available or default to 3002
const PORT = process.env.PORT_LOGOUT || 3002;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Logout Service running on port ${PORT}`); // Log message when the server starts
});
