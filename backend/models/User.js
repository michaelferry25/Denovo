const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  dob: String,
  employerNumber: String,
  email: { type: String, unique: true },
  password: String,
  employer: String,
  department: String,
  title: String,
  employeeNumber: String,
  leaveRequests: [
    {
      startDate: String,
      endDate: String
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
