const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Company = require('./models/Company');
// Set up app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/denovo', {
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  firstName: String,
  surname: String,
  dob: String,
  employerNumber: String,
  email: { type: String, unique: true },
  password: String,
}));

app.post('/api/signup', async (req, res) => {
    const { firstName, surname, dob, email, password, companyId, employerNumber } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const company = await Company.findOne({ companyId });
      if (!company) {
        return res.status(400).json({ message: 'Invalid company ID' });
      }
  
      // Verify employer number matches company records
      const isValidEmployee = await User.findOne({ 
        employerNumber,
        companyName: company.companyName 
      });
      
      if (!isValidEmployee) {
        return res.status(400).json({ message: 'Invalid employer number for this company' });
      }
  
      const newUser = new User({
        firstName,
        surname,
        dob,
        email,
        password,
        employerNumber, 
        companyName: company.companyName,
        department: company.department,
        title: company.title,
        companyLogo: company.logoUrl
      });
  
      await newUser.save();
      res.status(201).json({ success: true, message: 'User registered successfully' });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
  });

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});
  
// POST /api/signup
app.post('/api/signup', async (req, res) => {
    const { firstName, surname, dob, employerNumber, email, password, companyId } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
       // Validate company
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }
  
      // Assign random employee number starting with 123
      const randomEmployeeNumber = `123${Math.floor(1000 + Math.random() * 9000)}`;
  
      // Create new user
      const newUser = new User({
        firstName,
        surname,
        dob,
        employerNumber: randomEmployeeNumber,
        email,
        password,
        companyName: company.companyName,
        department: company.department,
        title: company.title,
      });
  
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
  });
  
// POST leave request
app.post('/api/leave-request', async (req, res) => {
    const { email, startDate, endDate } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      user.leaveRequests.push({ startDate, endDate });
      await user.save();
  
      res.status(201).json({ success: true, message: 'Leave request submitted successfully' });
    } catch (error) {
      console.error('Error submitting leave request:', error);
      res.status(500).json({ success: false, message: 'Failed to submit leave request' });
    }
  });
  
  // GET leave requests
  app.get('/api/leave-request', async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json(user.leaveRequests || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch leave requests' });
    }
  });
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
