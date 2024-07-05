// addBlog.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs'); // Adjust the path based on your project structure

// POST /addBlog
router.post('/', async (req, res) => {
    const { name, email, company, text } = req.body;

    // Validate request body
    if (!name || !email || !company || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new blog instance
        const newBlog = new Blog({ name, email, company, text });

        // Save the blog to the database
        await newBlog.save();

        return res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
    } catch (error) {
        console.error('Error adding blog:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
