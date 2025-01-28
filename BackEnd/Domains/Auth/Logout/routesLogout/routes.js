const express = require('express');
const { handleLogout } = require('../logout');
const router = express.Router();

router.post('/', handleLogout);

module.exports = router;
