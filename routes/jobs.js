require('dotenv').config(); // Add this line to load the .env file
const EMAIL_USER="rajashekard089@gmail.com"
const EMAIL_PASS="fllk lhvy vyje pzah"
const express = require('express');
const router = express.Router();
const Job = require('../models/jobs'); 
const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const sendNotificationToAllUsers = async (job) => {
  try {
    const users = await User.find();
    const emailPromises = users.map(user => {
      const mailOptions = {
        from: EMAIL_USER,
        to: user.email,
        subject: `New Job Posted: ${job.jobTitle} at ${job.companyName}`,
        text: `A new job has been posted:\n\nCompany: ${job.companyName}\nTitle: ${job.jobTitle}\nCTC: ${job.CTC}\nDate of Application: ${job.DOA}\nEligible Above: ${job.eligibleAbove}\n\nCheck out more details on our platform.`,
      };
      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

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
    await sendNotificationToAllUsers(newJob);
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (error) {;
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
