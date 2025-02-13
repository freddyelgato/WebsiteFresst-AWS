const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:3000", // Allows requests from the frontend
    methods: ["GET", "POST"], // Allowed methods
}));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Products API');
});

// Image storage configuration (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // 'uploads' folder within Product
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Folder for images

// Routes
const productsRoutes = require('./routes/products'); // Correct file path for products.js
app.use('/api/create', productsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Server configuration
const PORT = 4000; // Port dedicated to this microservice
app.listen(PORT, () => {
    console.log(`Products microservice running on http://localhost:${PORT}`);
});
