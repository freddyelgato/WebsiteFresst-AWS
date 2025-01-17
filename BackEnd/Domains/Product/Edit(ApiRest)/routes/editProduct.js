const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Configuración de almacenamiento de imágenes (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'uploads')); // Carpeta 'uploads' un nivel arriba de Edit(ApiRest)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Base de datos (archivo JSON)
const databasePath = path.join(__dirname, '..', '..', '..', '..', 'databases', 'Products', 'products.json');

// Ruta para editar un producto
router.put('/:id', upload.single('image'), (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    const newImage = req.file;

    try {
        const products = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Actualizar los datos del producto
        products[productIndex] = {
            ...products[productIndex],
            ...updatedData,
            image: newImage ? `/uploads/${newImage.filename}` : products[productIndex].image
        };

        fs.writeFileSync(databasePath, JSON.stringify(products, null, 2));
        res.json({ message: 'Product updated successfully', product: products[productIndex] });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
