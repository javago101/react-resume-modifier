const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/resume/upload', upload.single('resume'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        
        // For demo purposes, we'll just return a success response with a dummy ID
        res.json({
            success: true,
            resumeId: Date.now().toString(),
            message: 'File uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/resume/:id/analyze', (req, res) => {
    // Mock response for demo
    res.json({
        summary: 'Professional summary goes here',
        experience: [
            'Experience 1',
            'Experience 2'
        ],
        education: [
            'Education 1',
            'Education 2'
        ],
        skills: [
            'Skill 1',
            'Skill 2'
        ]
    });
});

app.get('/api/resume/:id/suggestions', (req, res) => {
    // Mock response for demo
    const suggestions = [
        {
            id: 1,
            text: 'Consider adding more quantifiable achievements',
            section: req.query.section
        },
        {
            id: 2,
            text: 'Use more action verbs in your descriptions',
            section: req.query.section
        }
    ];
    res.json(suggestions);
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 