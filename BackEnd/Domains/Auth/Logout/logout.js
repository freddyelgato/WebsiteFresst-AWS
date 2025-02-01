const express = require('express');
const axios = require('axios');
const router = express.Router();


// Ruta para logout
router.post('/', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del header
    console.log("Token recibido en Logout:", token);

    if (!token) {
        return res.status(400).json({ message: 'Token requerido' });
    }

    try {
        // Notificar al servicio de Validación para revocar el token
        const response = await axios.post('http://localhost:3003/validation/revoke', { token });

        if (response.status === 200) {
            return res.json({ message: 'Logout exitoso' });
        } else {
            return res.status(500).json({ message: 'Error al revocar el token' });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message);
        return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
});

module.exports = router;