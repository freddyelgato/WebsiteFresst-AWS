const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

// Configuración de multer para manejar las imágenes subidas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../APIs/ApiRest/ProductsApiRest/uploads'));  // Carpeta 'uploads' dentro de ProductsApiRest
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Renombrar archivo para evitar conflictos
  }
});
const upload = multer({ storage: storage });

// Ruta para obtener todos los productos
router.get('/', (req, res) => {  // Cambié '/products' a '/' 
    const productsPath = path.join(__dirname, '../../../../databases/products.json');
    fs.readFile(productsPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading products data');
      res.json(JSON.parse(data));
    });
  });
  
// Ruta para agregar un nuevo producto
router.post('/products', upload.single('image'), (req, res) => {
  const newProduct = req.body;
  if (req.file) {
    newProduct.imageUrl = 'uploads/' + req.file.filename;  // Guardar la ruta de la imagen en el producto
  } else {
    return res.status(400).send('No image uploaded');
  }
  const productsPath = path.join(__dirname, '../../databases/productDatabase/products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading products data');
    const products = JSON.parse(data);
    newProduct.id = products.length + 1;  // Asigna un ID único
    products.push(newProduct);
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving new product');
      res.status(201).json(newProduct);
    });
  });
});

// Ruta para actualizar un producto
router.put('/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const productsPath = path.join(__dirname, '../../databases/productDatabase/products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading products data');
    const products = JSON.parse(data);
    const productIndex = products.findIndex(p => p.id == id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../', products[productIndex].imageUrl);
      fs.unlinkSync(oldImagePath);  // Eliminar la imagen antigua
      updatedProduct.imageUrl = 'uploads/' + req.file.filename;  // Asignar la nueva imagen
    }
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving updated product');
      res.json(products[productIndex]);
    });
  });
});

// Ruta para eliminar un producto
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productsPath = path.join(__dirname, '../../databases/productDatabase/products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading products data');
    let products = JSON.parse(data);
    const product = products.find(p => p.id == id);
    if (!product) return res.status(404).send('Product not found');
    // Eliminar la imagen asociada al producto
    const imagePath = path.join(__dirname, '../../', product.imageUrl);
    fs.unlinkSync(imagePath);  // Eliminar la imagen del sistema de archivos
    products = products.filter(p => p.id != id);
    fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).send('Error deleting product');
      res.status(204).send();
    });
  });
});

module.exports = router;  // Exportar el router
