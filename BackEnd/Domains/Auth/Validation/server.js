const express = require('express');
const authenticateToken = require('./middlewares/authenticateToken'); // Middleware importado

const app = express();
app.use(express.json());

const PORT = 3002;

// Ruta protegida para validar usuarios
app.post('/validate', authenticateToken, (req, res) => {
    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({ message: 'Email y rol son requeridos' });
    }

    res.status(200).json({ message: 'Validación exitosa' });
});

app.listen(PORT, () => {
    console.log(`Servicio de validación escuchando en http://localhost:${PORT}`);
});
