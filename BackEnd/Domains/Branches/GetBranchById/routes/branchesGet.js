const express = require('express');
const BranchGet = require('../models/BranchGet');

const router = express.Router();

// Ruta para obtener todas las sucursales
router.get('/', async (req, res) => {
  try {
    const branches = await BranchGet.find(); // Obtener todas las sucursales

    res.status(200).json({ status: 'success', branches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching branches' });
  }
});


// Ruta para obtener una sucursal por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await BranchGet.findById(id);

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
