// Router index file to integrate all routes (there is only one route for this application)

// Importing express
const express = require('express');

// Importing routes
const notesRouter = require('./notesRouter');

// Set up /notes route
const app = express();
app.use('/notes', notesRouter);

// Export all routes for use in server file
module.exports = app;