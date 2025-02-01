const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log("Email recibido:", email);
    console.log("Password recibido:", password);

    // Validar que los campos email y password estén presentes
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        // Consultar el usuario en la base de datos por su email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña proporcionada con la contraseña hasheada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("¿Contraseña coincide?:", passwordMatch);

        // Si las contraseñas no coinciden
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar las credenciales con el servicio de validación
        const validationResponse = await axios.post('http://localhost:3003/validation/authenticate', {
            email,
            password,
        });

        // Si el servicio de validación devuelve un error
        if (!validationResponse.data.valid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generado:", token);

        // Enviar la respuesta con el token y el rol del usuario
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;