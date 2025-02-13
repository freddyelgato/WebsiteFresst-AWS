const express = require('express'); // Import express for routing and handling HTTP requests
const logoutController = require('../logout'); // Import the logout controller (the logic to handle logging out)

const router = express.Router(); // Create a new router instance to handle the routes

// Route to log out the user
router.post('/', logoutController); // When a POST request is made to the root of this route, it triggers the logoutController function

module.exports = router; // Export the router so it can be used in other parts of the application
