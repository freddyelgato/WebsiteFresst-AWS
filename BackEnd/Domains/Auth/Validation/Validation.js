const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_secreto_super_seguro';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

const validateHandler = [
    authenticateToken,
    (req, res) => {
        const { role } = req.user;
        if (role === 'admin') {
            res.json({ message: 'Acceso a la página de Admin', page: '/admin' });
        } else if (role === 'user') {
            res.json({ message: 'Acceso a la página de Usuario', page: '/user' });
        } else {
            res.status(403).json({ message: 'Acceso denegado' });
        }
    }
];

module.exports = { validateHandler };