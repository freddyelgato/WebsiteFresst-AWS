const express = require('express');
const multer = require('multer');
const path = require('path');
const Branch = require('../models/Branch');

const router = express.Router();

// Configuración de multer para manejar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta para crear una nueva sucursal
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No image uploaded' });
    }

    const { name, address, city, email, mobilePhone, landlinePhone } = req.body;
    if (!name || !address || !city || !email || !mobilePhone || !landlinePhone) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const newBranch = new Branch({
      name,
      address,
      city,
      email,
      mobilePhone,
      landlinePhone,
      imageUrl: 'http://localhost:4010/uploads/' + req.file.filename,
    });

    const savedBranch = await newBranch.save();
    res.status(201).json({ status: 'success', message: 'Branch created', branch: savedBranch });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error processing the branch' });
  }
});

// Ruta para obtener todas las sucursales
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json({ status: 'success', branches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching branches' });
  }
});

module.exports = router;
