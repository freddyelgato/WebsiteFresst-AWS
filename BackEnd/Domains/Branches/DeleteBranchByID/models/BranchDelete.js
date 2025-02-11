const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  landlinePhone: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { collection: 'branches', timestamps: true });

const BranchDelete = mongoose.model('BranchDelete', branchSchema);

module.exports = BranchDelete;
