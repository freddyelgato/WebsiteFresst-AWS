const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenBlacklist = require('../utils/tokenBlacklist');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token || tokenBlacklist.isBlacklisted(token)) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = user;
        next();
    });
};
