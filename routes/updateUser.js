const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed

// Update user data
router.post('/', async (req, res) => {
  const { email, ...updatedFields } = req.body;
  console.log("Request body:", req.body);

  try {
    if (!email) {
      console.log("Error: Email is required");
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Error: User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    Object.keys(updatedFields).forEach((key) => {
      user[key] = updatedFields[key];
    });

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error("Error updating user data:", error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }

    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
