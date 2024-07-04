// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();

// // POST /register
// router.post('/', (req, res) => {
//     const { email, password, role, name, registrationNumber } = req.body;
//     console.log('Received register request with:', email, password, role, name, registrationNumber);

//     // Validate required fields
//     if (!email || !password || !role || !name || !registrationNumber) {
//         console.log('Missing email, password, role, email, or registrationNumber in request body');
//         return res.status(400).json({ message: 'email, password, role, email, and registration number are required' });
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

//         // Check if email or email already exists
//         const existingUser = users.find(user => user.email === email);
//         if (existingUser) {
//             console.log('email exists:', email);
//             return res.status(409).json({ message: 'email already exists' });
//         }

//         // Add new user to array
//         const newUser = { email, password, role, name, registrationNumber };
//         users.push(newUser);

//         // Write updated data back to users.json
//         fs.writeFile(path.join(__dirname, '../db/users.json'), JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
//             if (writeErr) {
//                 console.error('Error writing to users.json:', writeErr);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }
//             console.log('User registered successfully:', email);
//             res.status(201).json({ message: 'User registered successfully' });
//         });
//     });
// });

// module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// POST /register
router.post('/', async (req, res) => {
    const { email, password, role, name, registrationNumber } = req.body;
    console.log('Received register request with:', email, password, role, name, registrationNumber);

    // Validate required fields
    if (!email || !password || !role || !name || !registrationNumber) {
        console.log('Missing email, password, role, name, or registrationNumber in request body');
        return res.status(400).json({ message: 'Email, password, role, name, and registration number are required' });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email exists:', email);
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            name,
            registrationNumber
        });

        // Save the user to the database
        await newUser.save();

        console.log('User registered successfully:', email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
