const express = require('express');
const loginController = require('../login');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/', loginController);

module.exports = router;
