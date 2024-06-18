const express = require('express');
const morgan = require('morgan');

// Start express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use(morgan('dev'));


app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


module.exports = app;