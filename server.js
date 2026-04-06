const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configure multer
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

// 🔥 VERY IMPORTANT — serve uploads folder
app.use('/uploads', express.static('uploads'));

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload route
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Photo received:', req.file.originalname);

    res.json({ 
        success: true, 
        filename: req.file.filename
    });
});

// 🔥 NEW — get all uploaded images
app.get('/images', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Cannot read uploads folder' });
        }
        res.json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Server running`);
});