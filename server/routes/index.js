const express = require('express');
const authRoute = require('./auth.route');

const router = express.Router();

// api path: localhost:4040/api/auth
router.use('/auth', authRoute);

module.exports = router;