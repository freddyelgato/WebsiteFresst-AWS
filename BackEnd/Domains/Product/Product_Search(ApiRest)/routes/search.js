const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { collection: 'products', timestamps: true }); // Specify the collection

const Product = mongoose.model('Product', productSchema);

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: 'success', products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error retrieving products' });
    }
});

// Route to search for products
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ status: 'error', message: 'Query parameter is required' });
        }

        const products = await Product.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search
        });

        res.status(200).json({ status: 'success', products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error searching for products' });
    }
});

module.exports = router;
