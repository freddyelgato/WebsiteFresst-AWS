const express = require('express');
const BranchDelete = require('../models/BranchDelete');

const router = express.Router();

// Ruta para eliminar una sucursal por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await BranchDelete.findByIdAndDelete(id);

    if (!branch) {
      return res.status(404).json({ status: 'error', message: 'Branch not found' });
    }

    res.status(200).json({ status: 'success', message: 'Branch deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error deleting branch' });
  }
});

module.exports = router;
