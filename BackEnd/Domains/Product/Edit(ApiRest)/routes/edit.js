const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Ensures the server does not start if it cannot connect to MongoDB
});

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Configure multer for image handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // 'uploads' folder inside Product
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.put('/:_id', upload.single('image'), async (req, res) => {
    console.log("Request received");
    try {
        const productId = req.params._id;  // Here we get the _id from the URL
        console.log("Editing product with _id:", productId);
        const { name, price, category } = req.body;

        // Find the product in the database to get the current image
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        // Create object to update only the provided fields
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = parseFloat(price);
        if (category) updateData.category = category;

        // Handling new image: only update the image if a new one is uploaded
        if (req.file) {
            // Delete the old image if it exists
            if (product.imageUrl) {
                const oldImagePath = path.join(__dirname, '../uploads', product.imageUrl.split('/').pop());
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }

            // Update the URL of the new image
            updateData.imageUrl = 'http://localhost:4000/uploads/' + req.file.filename;
        } else {
            // If no new image is uploaded, keep the existing image
            updateData.imageUrl = product.imageUrl;
        }

        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        res.status(200).json({ status: 'success', message: 'Product updated', product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error updating the product' });
    }
});

module.exports = router;
