// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();

// // POST /login
// router.post('/', (req, res) => {
//     const { email, password } = req.body;
//     console.log('Received login request with:', email, password);

//     if (!email || !password) {
//         console.log('Missing email or password in request body');
//         return res.status(400).json({ message: 'email and password are required' });
//     }

//     // Read data from users.json
//     fs.readFile(path.join(__dirname, '../db/users.json'), 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading users.json:', err);
//             return res.status(500).json({ message: 'Internal server error' });
//         }

//         let users;
//         try {
//             users = JSON.parse(data);
//         } catch (parseError) {
//             console.error('Error parsing users.json:', parseError);
//             return res.status(500).json({ message: 'Internal server error' });
//         }

//         // Find user by email and password
//         const user = users.find(user => user.email === email && user.password === password);
//         if (!user) {
//             console.log('Invalid credentials for:', email);
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Determine welcome message based on role
//         let welcomeMessage = `Welcome ${user.email}`;
//         if (user.role === 'admin') {
//             welcomeMessage = `Welcome admin ${user.email}`;
//         }

//         console.log('Login successful for:', email);
//         res.status(200).json({ message: welcomeMessage, role: user.role });
//     });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model

// POST /login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request with:', email, password);

    if (!email || !password) {
        console.log('Missing email or password in request body');
        return res.status(400).json({ message: 'email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid credentials for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log('Invalid credentials for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Login successful for:', email);
        res.status(200).json({ email: email, role: user.role });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
