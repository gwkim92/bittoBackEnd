//    routes/index.js
const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const walletRouter = require('./wallet');
const scanRouter = require('./scan');

router.use('/users', usersRouter);
router.use('/wallet', walletRouter);
router.use('/scan', scanRouter);

module.exports = router;
