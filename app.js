const express = require('express');

// Start express app
const app = express();

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

module.exports = app;