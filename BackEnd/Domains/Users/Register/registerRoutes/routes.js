const express = require('express');
const registerController = require('../register');

const router = express.Router();

// Route to register a new user
router.post('/', registerController);

module.exports = router;
