const express = require('express');
const Branch = require('../models/Branch');

const router = express.Router();

// Ruta para crear una nueva sucursal
router.post('/create', async (req, res) => {
  try {
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
      landlinePhone
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
