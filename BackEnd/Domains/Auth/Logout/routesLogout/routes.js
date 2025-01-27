const express = require('express');
const { logoutHandler } = require('../logout');
const router = express.Router();

router.post('/', logoutHandler);

module.exports = router;
