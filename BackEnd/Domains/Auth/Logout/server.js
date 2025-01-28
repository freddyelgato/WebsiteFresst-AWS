const express = require('express');
const cors = require('cors');
const logoutRoutes = require('./routesLogout/routes'); // Importar correctamente las rutas de logout
//require('dotenv').config(); // Cargar variables de entorno

const app = express();
app.use(express.json());
app.use(cors());

// Registrar las rutas de logout
app.use('/logout', logoutRoutes); // Aquí se debe usar 'logoutRoutes'

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Logout service running on http://localhost:${PORT}`);
});
