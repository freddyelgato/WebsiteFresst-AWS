const express = require('express');
const Branch = require('../models/Branch');

const router = express.Router();

// Route to create a new branch
router.post('/create', async (req, res) => {
  try {
    const { name, address, city, email, mobilePhone, landlinePhone } = req.body;
    
    // Check if all required fields are provided
    if (!name || !address || !city || !email || !mobilePhone || !landlinePhone) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    // Create a new branch object with the provided data
    const newBranch = new Branch({
      name,
      address,
      city,
      email,
      mobilePhone,
      landlinePhone
    });

    // Save the new branch to the database
    const savedBranch = await newBranch.save();
    res.status(201).json({ status: 'success', message: 'Branch created', branch: savedBranch });

  } catch (err) {
    console.error(err);  // Log the error
    res.status(500).json({ status: 'error', message: 'Error processing the branch' });
  }
});

// Route to get all branches
router.get('/', async (req, res) => {
  try {
    // Fetch all branches from the database
    const branches = await Branch.find();
    res.status(200).json({ status: 'success', branches });

  } catch (err) {
    console.error(err);  // Log the error
    res.status(500).json({ status: 'error', message: 'Error fetching branches' });
  }
});

module.exports = router;
