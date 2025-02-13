const express = require('express');
const BranchGet = require('../models/BranchGet');

const router = express.Router();

// Route to get all branches
router.get('/', async (req, res) => {
  try {
    const branches = await BranchGet.find(); // Get all branches

    res.status(200).json({ status: 'success', branches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching branches' });
  }
});

// Route to get a branch by ID
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
