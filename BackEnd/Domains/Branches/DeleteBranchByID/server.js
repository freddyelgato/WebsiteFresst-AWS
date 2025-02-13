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

app.use(cors({ origin: "http://localhost:3000", methods: ["DELETE"] })); // Enable CORS for DELETE requests from frontend
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Routes
const branchesDeleteRoutes = require('./routes/branchesDelete');
app.use('/api/branches/delete', branchesDeleteRoutes); // API route for deleting branches

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 error
});

// Server configuration
const PORT = 4013;
app.listen(PORT, () => {
  console.log(`Branch delete microservice running on http://localhost:${PORT}`);
});
