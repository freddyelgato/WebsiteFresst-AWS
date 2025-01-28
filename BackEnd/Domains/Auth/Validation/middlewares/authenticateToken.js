// Ruta: ./middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_secreto_super_seguro'; // Asegúrate de usar la misma clave en ambos servicios

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Error en jwt.verify:', err.message); // Para depuración
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user; // Adjunta los datos del token al request
        next();
    });
};

module.exports = authenticateToken;
