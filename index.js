const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const jobsRoute = require('./routes/jobs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Use the cors middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/jobs', jobsRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
