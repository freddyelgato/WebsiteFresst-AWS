const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Agregado para la configuración de CORS

const app = express();

// Configuración de CORS
app.use(cors({
    origin: "http://localhost:3000", // Permite solicitudes desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
}));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Welcome to the Products API');
});

// Configuración de almacenamiento de imágenes (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Carpeta para imágenes

// Base de datos (archivo JSON)
const databasePath = path.join(__dirname, '..', '..', '..', 'databases', 'products.json');

// Verifica si el archivo de la base de datos existe; si no, lo crea
if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, JSON.stringify([]));
}

// Ruta para cargar imágenes
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// Rutas
const productsRoutes = require('./routes/products');
app.use('/api/products', productsRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Configuración del servidor
const PORT = 4000; // Puerto exclusivo para este microservicio
app.listen(PORT, () => {
    console.log(`Products microservice running on http://localhost:${PORT}`);
});
