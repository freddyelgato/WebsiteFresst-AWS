const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["PUT"],
}));

// Middleware
app.use(bodyParser.json());

// Routes
const editRoutes = require('./routes/edit');
app.use('/api/edit', editRoutes);

// Server configuration
const PORT = 4002; // Port exclusive to this microservice
app.listen(PORT, () => {
    console.log(`Edit Products microservice running on http://localhost:${PORT}`);
});
