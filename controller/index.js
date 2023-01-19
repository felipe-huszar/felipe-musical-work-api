const express = require('express');
const router = express.Router();
const musicalWorkController = require('./musical-work-controller');

router.use('/musical-work', musicalWorkController);

module.exports = router;