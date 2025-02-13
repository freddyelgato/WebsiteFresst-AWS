const mongoose = require('mongoose');

// Define the schema for the branch
const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name of the branch (required)
  address: { type: String, required: true },  // Address of the branch (required)
  city: { type: String, required: true },  // City where the branch is located (required)
  email: { type: String, required: true },  // Email of the branch (required)
  mobilePhone: { type: String, required: true },  // Mobile phone number (required)
  landlinePhone: { type: String, required: true }  // Landline phone number (required)
}, { collection: 'branches', timestamps: true });  // Define the collection name and enable timestamps

// Create a model for the Branch based on the schema
const Branch = mongoose.model('Branch', branchSchema);

// Export the Branch model for use in other parts of the application
module.exports = Branch;
