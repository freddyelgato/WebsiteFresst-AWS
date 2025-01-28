const jwt = require('jsonwebtoken');

// Generar una clave secreta (para desarrollo o pruebas)
const SECRET_KEY = 'tu_secreto_super_seguro';

// Verificar el token con la clave secreta generada
const handleLogout = (req, res) => {
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido para cerrar sesión' });
    }
    try {
        // Verificar el token
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Token inválido o ya expirado' });
            }
            // Aquí puedes continuar con el logout si el token es válido
            // Agregar a la lista negra o eliminar el token
            return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
        });

    } catch (error) {
        return res.status(400).json({ message: 'Token inválido o ya expirado' });
    }
};

module.exports = { handleLogout };
