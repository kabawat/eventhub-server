const express = require('express');
const cors = require('cors')
const app = express();
const router = require('#src/routes/')

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use("/", router)
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app