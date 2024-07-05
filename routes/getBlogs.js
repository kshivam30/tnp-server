// routes/getBlogs.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs'); // Adjust the path based on your project structure

// GET /getBlogs - Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
});

module.exports = router;
