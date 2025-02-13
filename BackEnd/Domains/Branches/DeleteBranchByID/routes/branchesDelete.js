const express = require('express');
const BranchDelete = require('../models/BranchDelete');

const router = express.Router();

// Route to delete a branch by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Get the ID from the route parameters
    const branch = await BranchDelete.findByIdAndDelete(id);  // Attempt to find and delete the branch by its ID

    if (!branch) {
      return res.status(404).json({ status: 'error', message: 'Branch not found' });  // If no branch is found, return a 404 error
    }

    res.status(200).json({ status: 'success', message: 'Branch deleted successfully' });  // If branch is deleted, return a success message
  } catch (err) {
    console.error(err);  // Log the error if something goes wrong
    res.status(500).json({ status: 'error', message: 'Error deleting branch' });  // Return a 500 error if the delete operation fails
  }
});

module.exports = router;  // Export the router for use in other parts of the application
