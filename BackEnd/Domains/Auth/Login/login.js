const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const loginHandler = (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin123') {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Bienvenido Admin', token, role: 'admin' });
    } else if (email === 'user@example.com' && password === 'user123') {
        const token = jwt.sign({ role: 'user' }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Bienvenido Usuario', token, role: 'user' });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

module.exports = { loginHandler };