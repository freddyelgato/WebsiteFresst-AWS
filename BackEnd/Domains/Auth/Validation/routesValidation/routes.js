const express = require('express');
const validationController = require('../validation');

const router = express.Router();

// Ruta para autenticar credenciales
router.post('/authenticate', validationController);

// Ruta para validar un token
router.post('/validate', validationController);

// Ruta para revocar un token
router.post('/revoke', validationController);

module.exports = router;