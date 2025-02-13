const express = require('express');
const multer = require('multer');
const path = require('path');
const BranchEdit = require(path.join(__dirname, '../models/BranchEdit'));

const router = express.Router();

// Multer configuration to handle image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Define the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp for the file name to avoid name conflicts
  }
});
const upload = multer({ storage: storage }); // Initialize multer with the storage configuration

// Route to update a branch by its ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params; // Extract branch ID from request parameters
    const { name, address, city, email, mobilePhone, landlinePhone } = req.body; // Extract data from the request body
    
    // Check if all required fields are provided
    if (!name || !address || !city || !email || !mobilePhone || !landlinePhone) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    let updatedData = { name, address, city, email, mobilePhone, landlinePhone };
    
    // If a new image is uploaded, update the image URL
    if (req.file) {
      updatedData.imageUrl = 'http://localhost:4011/uploads/' + req.file.filename;
    }

    // Update the branch in the database using the provided ID and new data
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

// Route to get a branch by its ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract branch ID from request parameters
    const branch = await BranchEdit.findById(id); // Find the branch by its ID

    if (!branch) {
      return res.status(404).json({ status: 'error', message: 'Branch not found' });
    }

    res.status(200).json({ status: 'success', branch }); // Return the branch data

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error fetching branch' });
  }
});

module.exports = router;
