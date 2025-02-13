// Import the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
require('dotenv').config(); // For loading environment variables

const router = express.Router();

// Multer configuration to handle uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // 'uploads' folder within the Product directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { // Add the name of the database
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
}, { collection: 'products', timestamps: true }); // Specify the collection

const Product = mongoose.model('Product', productSchema);

// Route to add a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Validate that an image is uploaded
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No image uploaded' });
    }

    // Validate that the product body has basic data
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ status: 'error', message: 'Product name, price, and category are required' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      category,
      imageUrl: 'http://localhost:4000/uploads/' + req.file.filename,
    });

    // Save the product in the database
    const savedProduct = await newProduct.save();

    // Respond with the created product
    res.status(201).json({ status: 'success', message: 'Product created', product: savedProduct });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error processing the product' });
  }
});

module.exports = router;
