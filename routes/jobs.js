const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST /jobs
router.post('/', (req, res) => {
    const { companyName, CTC, DOA, eligibleAbove, Applied, logo, jobTitle, jobType } = req.body;
    console.log('Received job post request with:', companyName, CTC, DOA, eligibleAbove, Applied, logo, jobTitle, jobType);

    // Validate required fields
    if (!companyName || !CTC || !DOA || !eligibleAbove || !Applied || !logo || !jobTitle || !jobType) {
        console.log('Missing required fields in request body');
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Read data from jobs.json
    fs.readFile(path.join(__dirname, '../db/jobs.json'), 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading jobs.json:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let jobs = [];
        if (data) {
            try {
                jobs = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing jobs.json:', parseError);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }

        // Construct new job object
        const newJob = {
            companyName,
            CTC,
            DOA,
            eligibleAbove,
            Applied,
            logo,
            jobTitle,
            jobType
        };

        // Add new job to array
        jobs.push(newJob);

        // Write updated data back to jobs.json
        fs.writeFile(path.join(__dirname, '../db/jobs.json'), JSON.stringify(jobs, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to jobs.json:', writeErr);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Job posted successfully:', companyName);
            res.status(201).json({ message: 'Job posted successfully' });
        });
    });
});

module.exports = router;
