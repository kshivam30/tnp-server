const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// GET /jobs
router.get('/', (req, res) => {
    // Read data from jobs.json
    fs.readFile(path.join(__dirname, '../db/jobs.json'), 'utf8', (err, data) => {
        if (err) {
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

        res.status(200).json(jobs);
    });
});

module.exports = router;
