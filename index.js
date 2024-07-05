const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const getUserRoute = require('./routes/getUser')
const jobsRoute = require('./routes/jobs');
const removeJobRoute = require ('./routes/removeJob')
const getJobsRoute = require('./routes/getJobs');
const allowCors = require('./allowCors'); // Adjust the path if necessary
const applyRoute = require('./routes/apply'); 
const addBlogRoute = require('./routes/addBlog')
const getBlogsRouter = require('./routes/getBlogs');

const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config();

// Middleware
app.use(allowCors); // Apply allowCors middleware globally
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/getUser', getUserRoute);
app.use('/addJob', jobsRoute);
app.use('/removeJob', removeJobRoute);
app.use('/getJobs', getJobsRoute);
app.use('/jobs/apply', applyRoute);
app.use('/addBlog', addBlogRoute);
app.use('/getBlogs', getBlogsRouter);


/* MONGOOSE SETUP */
const uri = process.env.MONGO_URL;
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
