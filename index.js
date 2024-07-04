const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const jobsRoute = require('./routes/jobs');
const getJobsRoute = require('./routes/getJobs');

const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config();

// Middleware
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/addJob', jobsRoute);
app.use('/getJobs', getJobsRoute);

/* MONGOOSE SETUP */
const uri = process.env.MONGO_URL;
console.log('MongoDB URI:', uri); // Debugging line
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
