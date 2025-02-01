const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Agregado, ya que lo usas en authenticate
const { Pool } = require('pg');
require('dotenv').config();

// Importar el módulo de lista negra de tokens
const tokenBlacklist = require('../Logout/utils/tokenBlacklist'); 

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Endpoint para autenticar credenciales
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        // Consultar el usuario en la base de datos por su email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.json({ valid: false });
        }

        // Comparar contraseñas
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ valid: false });
        }

        res.json({ valid: true, user });
    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        res.status(500).json({ message: 'Error al autenticar usuario' });
    }
});

// Ruta para validar un token
router.post('/', async (req, res) => {
    const { token } = req.body;

    // Validar si el token está en la lista negra
    if (!token || tokenBlacklist.isBlacklisted(token)) {
        return res.json({ valid: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.json({ valid: false });

        try {
            // Verificar el usuario en la base de datos
            const userResponse = await pool.query('SELECT * FROM users WHERE id = $1', [user.id]);

            if (userResponse.rows[0]) {
                return res.json({ valid: true });
            } else {
                return res.json({ valid: false });
            }
        } catch (error) {
            console.error('Error al verificar usuario:', error.message);
            return res.json({ valid: false });
        }
    });
});

// Ruta para revocar tokens (usado por Logout)
router.post('/revoke', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token requerido' });
    }

    tokenBlacklist.add(token);
    res.json({ message: 'Token revocado' });
});

module.exports = router;
