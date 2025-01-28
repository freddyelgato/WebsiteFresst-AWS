const express = require('express');
const cors = require('cors');
const path = require('path');
const authenticateToken = require(path.resolve(__dirname, '../Validation/middlewares/authenticateToken'));
const bodyParser = require('body-parser');
const routes = require('./routesLogin/routes');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/login', routes);

// Ruta protegida para admin
app.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: No eres admin' });
    }

    res.status(200).json({ message: 'Bienvenido al panel de admin' });
});

// Ruta protegida para usuarios
app.get('/user', authenticateToken, (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Acceso denegado: No eres un usuario válido' });
    }

    res.status(200).json({ message: 'Bienvenido al área de usuario' });
});

app.listen(PORT, () => {
    console.log(`Login service running on port ${PORT}`);
});
