const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  dob: { type: String, required: true }, // or Date if you want
  employerNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // (plaintext for now - hashing later)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
