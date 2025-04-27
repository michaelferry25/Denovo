const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyId: { type: String, required: true},
  department: { type: String, required: true },
  title: { type: String, required: true },
  logoUrl: { type: String, default: '' }
});

module.exports = mongoose.model('Company', CompanySchema);