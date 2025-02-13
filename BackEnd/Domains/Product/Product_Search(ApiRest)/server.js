const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: "*",
    methods: ["GET"],
}));

// Middleware
app.use(bodyParser.json());

// Routes
const searchRoutes = require('./routes/search');
app.use('/api/products', searchRoutes);

// Server configuration
const PORT = 4003; // Port exclusive for this microservice
app.listen(PORT, () => {
    console.log(`Search Products microservice running on http://localhost:${PORT}`);
});
