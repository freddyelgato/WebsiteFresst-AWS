// Importamos los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
require('dotenv').config(); // Para cargar las variables de entorno

const router = express.Router();

// Configuración de multer para manejar las imágenes subidas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Carpeta 'uploads' dentro de Product
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo para evitar conflictos
  }
});
const upload = multer({ storage: storage });

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { // Agregar el nombre de la base de datos
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

// Definimos el esquema y modelo de producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { collection: 'products', timestamps: true }); // Especificar la colección

const Product = mongoose.model('Product', productSchema);

// Ruta para agregar un nuevo producto
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Validamos que la imagen esté presente
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No image uploaded' });
    }

    // Validamos que el cuerpo del producto tenga datos básicos
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ status: 'error', message: 'Product name, price, and category are required' });
    }

    // Creamos un nuevo producto
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      category,
      imageUrl: 'http://localhost:4000/uploads/' + req.file.filename,
    });

    // Guardamos el producto en la base de datos
    const savedProduct = await newProduct.save();

    // Respondemos con el producto creado
    res.status(201).json({ status: 'success', message: 'Product created', product: savedProduct });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error processing the product' });
  }
});

module.exports = router;
