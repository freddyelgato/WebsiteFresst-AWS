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

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));  // Allow cross-origin requests from frontend
app.use(bodyParser.json());  // Parse incoming requests with JSON payload

// Routes
const branchesRoutes = require('./routes/branches');
app.use('/api/branches', branchesRoutes);  // Use the branches routes for the '/api/branches' endpoint

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace
  res.status(500).json({ error: 'Internal Server Error' });  // Send a generic server error response
});

// Server setup
const PORT = 4010;
app.listen(PORT, () => {
  console.log(`Branches microservice running on http://localhost:${PORT}`);  // Log the server startup message
});
