const express = require('express');
const router = express.Router();
const instagramRoutes = require('./instagram.routes');

// Mount routes
router.use('/instagram', instagramRoutes);

module.exports = router;
