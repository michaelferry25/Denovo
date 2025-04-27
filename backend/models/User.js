const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    dob: { type: String, required: true },
    employerNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: String,
    department: String,
    title: String,
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
