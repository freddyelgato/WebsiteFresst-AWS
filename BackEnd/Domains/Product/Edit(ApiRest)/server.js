const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: "http://localhost:3000", // Permite solicitudes desde el frontend
    methods: ["GET", "PUT"], // Métodos permitidos
}));

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Carpeta para imágenes

// Configuración de almacenamiento de imágenes (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Carpeta 'uploads' un nivel arriba
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Base de datos (archivo JSON)
const databasePath = path.join(__dirname, '..', '..', '..', 'databases', 'Products', 'products.json');
console.log('Database path:', databasePath);

// Verifica si el archivo de la base de datos existe; si no, lo crea
if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, JSON.stringify([]));
}

// Rutas
const productsRoutes = require('./routes/products');
app.use('/api/products', productsRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Configuración del servidor
const PORT = 4001; // Puerto exclusivo para este microservicio
app.listen(PORT, () => {
    console.log(`Edit microservice running on http://localhost:${PORT}`);
});
