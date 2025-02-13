// Importing express and the validationController for handling requests
const express = require('express');
const validationController = require('./Validation');

// Initialize the router from express
const router = express.Router();

// Route to authenticate credentials
router.post('/authenticate', validationController);

// Route to validate a token
router.post('/validate', validationController);

// Route to revoke a token
router.post('/revoke', validationController);

// Exporting the router so it can be used in other parts of the application
module.exports = router;
