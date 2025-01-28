const express = require('express');
const { loginHandler } = require('../login');
const router = express.Router();

router.post('/', loginHandler);

module.exports = router;