const mongoose = require('mongoose');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName:   { type: String },
  surname:     { type: String },
  dob:         { type: String },
  employerNumber:{ type:String },
  email:       { type: String, unique: true },
  password:    { type: String },
  companyName: { type: String },
  department:  { type: String },
  title:       { type: String },
  employeeNumber:{ type:String },
  logoUrl:     { type: String },
  bio:   { type: String, default: '' },
  age:   { type: Number, default: null },
  phone: { type: String, default: '' },
  leaveRequests: [
    {
      startDate: String,
      endDate:   String
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);

