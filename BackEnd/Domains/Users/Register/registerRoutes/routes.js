const express = require('express');
const registerController = require('../register');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/', registerController);

module.exports = router;