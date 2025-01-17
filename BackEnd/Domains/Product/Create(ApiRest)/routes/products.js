const express = require('express');
const fs = require('fs').promises; // Usamos fs.promises para utilizar async/await
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
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

    // Leemos el archivo de productos
    const productsPath = path.join(__dirname, '../../../../databases/Products/products.json');
    const data = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(data);

    // Calcular el próximo ID
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: uuidv4(), // Genera un ID único
      name,
      price: parseFloat(price),
      category,
      imageUrl: 'uploads/' + req.file.filename,
    };
    
    /*
    // Crear el nuevo producto
    const newProduct = {
      id: nextId, // Asignar el ID incremental
      name,
      price: parseFloat(price), // Aseguramos que el precio sea un número
      category,
      imageUrl: 'uploads/' + req.file.filename, // Ruta de la imagen
    };*/

    // Añadimos el nuevo producto al array
    products.push(newProduct);

    // Escribimos los nuevos datos en el archivo de productos
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2));

    // Respondemos con el producto creado
    res.status(201).json({ status: 'success', message: 'Product created', product: newProduct });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error processing the product' });
  }
});

module.exports = router; // Exportar el router
