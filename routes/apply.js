const express = require('express');
const User = require('../models/user'); // Adjust the path as needed
const router = express.Router();

// POST /apply
router.post('/', async (req, res) => {
    const { email, company } = req.body;
    console.log('Received apply request with:', email, company);

    // Validate required fields
    if (!email || !company) {
        console.log('Missing email or company in request body');
        return res.status(400).json({ message: 'Email and company are required' });
    }

    try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already applied to the company
        const alreadyApplied = user.AppliedIn.some(item => item.company === company);
        if (alreadyApplied) {
            console.log('User has already applied to this company:', company);
            return res.status(400).json({ message: 'User has already applied to this company' });
        }

        // Add the new application
        user.AppliedIn.push({ company, applied: true });
        await user.save();

        console.log('User applied to company successfully:', company);
        res.status(200).json({ message: 'User applied to company successfully' });
    } catch (error) {
        console.error('Error applying to company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
