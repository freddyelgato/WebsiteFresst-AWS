const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: "http://localhost:3000", methods: ["GET"] })); // Enable CORS for GET requests from the frontend
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// Routes
const branchesGetRoutes = require('./routes/branchesGet');
app.use('/api/branches', branchesGetRoutes); // Use the branchesGet routes for API requests

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
});

// Server configuration
const PORT = 4012;
app.listen(PORT, () => {
  console.log(`Branch get microservice running on http://localhost:${PORT}`); // Log the server is running
});
