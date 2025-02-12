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

app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use(bodyParser.json());

// Rutas
const branchesRoutes = require('./routes/branches');
app.use('/api/branches', branchesRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Configuración del servidor
const PORT = 4010;
app.listen(PORT, () => {
  console.log(`Branches microservice running on http://localhost:${PORT}`);
});
