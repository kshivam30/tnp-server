const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login'); // Add this line
const jobsRoute = require('./routes/jobs')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute); // Use loginRoute for /login endpoint
app.use('/jobs', jobsRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
