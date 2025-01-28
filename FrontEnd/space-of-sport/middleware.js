const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Cambia esto por una variable de entorno en producción

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtén el header de autorización
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token (después de "Bearer ")

    if (!token) {
        // Si no hay token, devuelve un error
        return res.status(401).json({ message: 'Token requerido' });
    }

    // Verifica el token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // Si el token es inválido o expiró, devuelve un error
            return res.status(403).json({ message: 'Token inválido' });
        }

        // Si es válido, almacena los datos del usuario en `req.user`
        req.user = user;
        next(); // Llama a la siguiente función de la ruta
    });
};

module.exports = authenticateToken;
