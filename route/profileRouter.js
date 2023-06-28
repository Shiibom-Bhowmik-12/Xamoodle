const path = require('path');
const express = require('express');
const router = express.Router();
const profileController = require(path.join(__dirname, '..', 'controller', 'profileController'));

router.post('/create', profileController.addProfile);

router.get('/all', profileController.allProfiles);

module.exports = router;