const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST /login
router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request with:', username, password);

    if (!username || !password) {
        console.log('Missing username or password in request body');
        return res.status(400).json({ message: 'Username and password are required' });
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

        // Find user by username and password
        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            console.log('Invalid credentials for:', username);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Determine welcome message based on role
        let welcomeMessage = `Welcome ${user.username}`;
        if (user.role === 'admin') {
            welcomeMessage = `Welcome admin ${user.username}`;
        }

        console.log('Login successful for:', username);
        res.status(200).json({ message: welcomeMessage, role: user.role });
    });
});

module.exports = router;
