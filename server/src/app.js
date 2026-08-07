const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Avaasa API is Live 🚀"
    });
});

// Mount API base routes
app.use('/api', apiRoutes);

// Fallback 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Centralized Error handler
app.use((err, req, res, next) => {
  console.error("Centralized Express handler caught:", err.stack || err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
