const express = require('express');
const logoutController = require('../logout');

const router = express.Router();

// Ruta para cerrar sesión
router.post('/', logoutController);

module.exports = router;
