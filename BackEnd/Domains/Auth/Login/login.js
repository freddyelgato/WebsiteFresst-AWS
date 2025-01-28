const axios = require('axios');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_secreto_super_seguro'; // Asegúrate de que coincida con el servicio de validación

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica las credenciales internamente
        let role;
        if (email === 'admin@example.com' && password === 'admin123') {
            role = 'admin';
        } else if (email === 'user@example.com' && password === 'user123') {
            role = 'user';
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Genera el token
        const token = jwt.sign({ role, email }, SECRET_KEY, { expiresIn: '1h' });

        // Envía una solicitud al servicio de validación
        const validationResponse = await axios.post(
            'http://localhost:3002/validate',
            { email, role },
            { headers: { Authorization: `Bearer ${token}` } } // Agrega el token al encabezado
        );

        if (validationResponse.status === 200) {
            return res.json({
                message: `Bienvenido ${role === 'admin' ? 'Admin' : 'Usuario'}`,
                token,
                role,
            });
        }
    } catch (error) {
        if (error.response) {
            console.error('Error en validación:', error.response.data); // Depuración
            return res
                .status(error.response.status)
                .json({ message: error.response.data.message });
        } else {
            console.error('Error en validación:', error.message); // Error de red u otro
            return res.status(500).json({ message: 'Error al validar usuario' });
        }
    }
};

module.exports = { loginHandler };
