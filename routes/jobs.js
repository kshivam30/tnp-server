const express = require('express');
const router = express.Router();
const Job = require('../models/jobs'); 

// POST /jobs
router.post('/', async (req, res) => {
    const { companyName, CTC, DOA, eligibleAbove, logo, jobTitle, jobType } = req.body;
    console.log('Received job post request with:', companyName, CTC, DOA, eligibleAbove, logo, jobTitle, jobType);

    // Validate required fields
    if (!companyName || !CTC || !DOA || !eligibleAbove || !logo || !jobTitle || !jobType) {
        console.log('Missing required fields in request body');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new job
        const newJob = new Job({
            companyName,
            CTC,
            DOA,
            eligibleAbove,
            logo,
            jobTitle,
            jobType
        });

        // Save the job to the database
        await newJob.save();

        console.log('Job posted successfully:', companyName);
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
