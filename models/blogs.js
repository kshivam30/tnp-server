// blogs.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    // Add more fields as needed
});

module.exports = mongoose.model('Blog', blogSchema);
