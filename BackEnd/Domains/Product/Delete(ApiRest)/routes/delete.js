const express = require('express'); 
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Route to delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Find and delete the product
        const productToDelete = await Product.findByIdAndDelete(productId);

        if (!productToDelete) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        // Delete the associated image
        const imagePath = path.join(__dirname, '../uploads', productToDelete.imageUrl.split('/').pop());
        await fs.unlink(imagePath).catch(() => console.log('Image file not found'));

        res.status(200).json({ status: 'success', message: 'Product deleted', product: productToDelete });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error deleting the product' });
    }
});

module.exports = router;
