//    routes/index.js
const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const walletRouter = require('./wallet');

router.use('/users', usersRouter);
router.use('/wallet', walletRouter);

module.exports = router;
