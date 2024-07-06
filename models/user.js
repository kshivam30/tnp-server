const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    AppliedIn: [
        { companyName: { type: String, required: true } }
    ],
    avatarUrl: { type: String },
    semester: { type: String },
    cgpa: { type: String },
    resume: { type: String },
    tenthMarks: { type: String },
    twelfthMarks: { type: String },
    branch: { type: String }
});

module.exports = mongoose.model('User', userSchema);
