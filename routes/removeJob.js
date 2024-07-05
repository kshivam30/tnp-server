const express = require('express');
const router = express.Router();
const Job = require('../models/jobs'); 

router.post('/', async (req, res) => {
    const { companyName } = req.body;

    // Validate the companyName is provided
    if (!companyName) {
        return res.status(400).json({ message: 'Company name is required' });
    }

    try {
        // Remove jobs with the specified company name
        const result = await Job.deleteMany({ companyName });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No jobs found for the specified company name' });
        }

        res.status(200).json({ message: 'Jobs removed successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error removing jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
