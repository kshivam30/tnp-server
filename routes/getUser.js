const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

// POST /login
router.post('/', async (req, res) => {
    const { email } = req.body;
    console.log('Get user: ', email);

    if (!email) {
        console.log('Missing email in request body');
        return res.status(400).json({ message: 'email is required' });
    }

    try {
       const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid search for:', email);
            return res.status(401).json({ message: 'Invalid user' });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
