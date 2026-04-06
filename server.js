const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle photo upload
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // File is saved in req.file.path
    console.log('Photo received:', req.file.originalname);
    
    // Here you could:
    // - Save to a database
    // - Send to your email
    // - Store in cloud storage
    // - Process the image
    
    res.json({ 
        success: true, 
        message: 'Photo received successfully',
        filename: req.file.filename
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});