const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "DELETE"],
}));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Delete Products API');
});

// Middleware
app.use(bodyParser.json());

// Routes
const deleteRoutes = require('./routes/delete');
app.use('/api/products', deleteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Server setup
const PORT = 4001; // Port dedicated to this microservice
app.listen(PORT, () => {
    console.log(`Delete Products microservice running on http://localhost:${PORT}`);
});
