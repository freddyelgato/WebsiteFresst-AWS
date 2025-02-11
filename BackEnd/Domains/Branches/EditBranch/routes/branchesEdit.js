const express = require('express');
const multer = require('multer');
const path = require('path');
const BranchEdit = require('../models/BranchEdit');

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

// Ruta para actualizar una sucursal por su ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, email, mobilePhone, landlinePhone } = req.body;
    
    if (!name || !address || !city || !email || !mobilePhone || !landlinePhone) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    let updatedData = { name, address, city, email, mobilePhone, landlinePhone };
    
    // Si se sube una nueva imagen, actualizar la URL
    if (req.file) {
      updatedData.imageUrl = 'http://localhost:4011/uploads/' + req.file.filename;
    }

    const updatedBranch = await BranchEdit.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBranch) {
      return res.status(404).json({ status: 'error', message: 'Branch not found' });
    }

    res.status(200).json({ status: 'success', message: 'Branch updated', branch: updatedBranch });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error updating the branch' });
  }
});

// Ruta para obtener una sucursal por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await BranchEdit.findById(id);

    if (!branch) {
      return res.status(404).json({ status: 'error', message: 'Branch not found' });
    }

    res.status(200).json({ status: 'success', branch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching branch' });
  }
});

module.exports = router;
