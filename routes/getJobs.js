const express = require('express');
const router = express.Router();
const Job = require('../models/jobs'); // Import the Job model

// GET /jobs
router.get('/', async (req, res) => {
    try {
        // Fetch all jobs from the database
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
