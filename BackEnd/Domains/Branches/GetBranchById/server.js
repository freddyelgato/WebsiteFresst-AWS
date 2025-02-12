const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: "http://localhost:3000", methods: ["GET"] }));
app.use(bodyParser.json());

// Rutas
const branchesGetRoutes = require('./routes/branchesGet');
app.use('/api/branches', branchesGetRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Configuración del servidor
const PORT = 4012;
app.listen(PORT, () => {
  console.log(`Branch get microservice running on http://localhost:${PORT}`);
});
