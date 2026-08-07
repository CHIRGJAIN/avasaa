const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagram.controller');

router.get('/photos', instagramController.getInstagramPhotos);

module.exports = router;
