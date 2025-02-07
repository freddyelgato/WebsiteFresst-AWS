const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

// Ajustar la ruta de la lista negra de tokens
//const tokenBlacklist = require('./Backend/Auth/Logout/utils/tokenBlacklist');
const tokenBlacklist = require('./utils/tokenBlacklist');


const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Ruta para autenticar credenciales
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.json({ valid: false });
        }

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

    if (!token || tokenBlacklist.isBlacklisted(token)) {
        return res.json({ valid: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.json({ valid: false });

        try {
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

// Ruta para revocar tokens
router.post('/revoke', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token requerido' });
    }

    tokenBlacklist.add(token);
    res.json({ message: 'Token revocado' });
});

module.exports = router;
