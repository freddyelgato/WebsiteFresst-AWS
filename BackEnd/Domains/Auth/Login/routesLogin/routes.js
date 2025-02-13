// Import express and the login controller
const express = require('express');
const loginController = require('../login');

// Create a new router instance using express
const router = express.Router();

// Route for logging in (POST request to the root)
router.post('/', loginController);

// Export the router to be used in other parts of the application
module.exports = router;
