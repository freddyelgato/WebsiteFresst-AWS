const express = require('express');
const { validateHandler } = require('../validation');
const router = express.Router();

router.post('/', validateHandler);

module.exports = router;
