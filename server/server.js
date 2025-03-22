require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobSearch', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

connectDB();

// Job Schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    salary: String,
    apply_link: String,
    posted_at: Date,
    job_description: String,
    created_at: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// Routes
app.get('/jobs/fetch_jobs', async (req, res) => {
    try {
        const { query, location, max_pages, remote_only, min_salary, date_posted } = req.query;

        // Store the search parameters
        console.log('Search parameters:', {
            query,
            location,
            max_pages,
            remote_only,
            min_salary,
            date_posted
        });

        // For now, just store a mock job
        const mockJob = new Job({
            title: 'Software Engineer',
            company: 'Example Corp',
            location: location || 'Remote',
            salary: min_salary ? `${min_salary}-${parseInt(min_salary) + 20000} USD` : '120000-140000 USD',
            apply_link: 'https://example.com/apply',
            posted_at: new Date(),
            job_description: 'This is a mock job posting for testing purposes.'
        });

        await mockJob.save();

        res.json({
            message: 'Job data fetching initiated',
            stored: true
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            message: 'Failed to fetch job data',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 