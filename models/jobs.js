const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    CTC: { type: String, required: true },
    DOA: { type: Date, required: true },
    eligibleAbove: { type: String, required: true },
    logo: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobType: { type: String, required: true },
    userApplied: { type: [String], default: [] } 
});

module.exports = mongoose.model('Job', jobSchema);