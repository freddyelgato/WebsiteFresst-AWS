const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config(); // Cargar variables de entorno

const router = express.Router();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Definimos el esquema y modelo de producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Configuración de multer para manejo de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Carpeta para almacenar imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.put('/:_id', upload.single('image'), async (req, res) => { // Asegúrate de usar _id en lugar de id
    console.log("Request received")
    try {
        const productId = req.params._id;  // Aquí recogemos el _id de la URL
        console.log("Editing product with _id:", productId);
        const { name, price, category } = req.body;

        // Crear objeto para actualizar solo los campos provistos
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = parseFloat(price);
        if (category) updateData.category = category;

        // Manejo de nueva imagen
        if (req.file) {
            updateData.imageUrl = 'uploads/' + req.file.filename;
        }

        // Actualizar producto en la base de datos
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        res.status(200).json({ status: 'success', message: 'Product updated', product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error updating the product' });
    }
});


module.exports = router;
