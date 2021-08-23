// Main server file

// Import required modules
const express = require('express');
const path = require('path');

// Import all routes from /routes folder
const api = require('./routes/index.js');

// Create server
const app = express();

// Assign port for deployment || development
const PORT = process.env.PORT || 3001;

// Use necessary middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the route that serves note data at '/api/
app.use("/api", api);

// Respond to initial requests with html homepage from /public
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Load and show notes page from /public
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Start up the server
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
