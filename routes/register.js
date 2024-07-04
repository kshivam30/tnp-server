const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST /register
router.post('/', (req, res) => {
    const { username, password, role } = req.body;
    console.log('Received register request with:', username, password, role);

    if (!username || !password || !role) {
        console.log('Missing username, password, or role in request body');
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    // Read data from users.json
    fs.readFile(path.join(__dirname, '../db/users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing users.json:', parseError);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            console.log('Username already exists:', username);
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Add new user to array
        const newUser = { username, password, role };
        users.push(newUser);

        // Write updated data back to users.json
        fs.writeFile(path.join(__dirname, '../db/users.json'), JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to users.json:', writeErr);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User registered successfully:', username);
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

module.exports = router;
