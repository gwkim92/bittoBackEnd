const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/scannerController');

router.get('/:eth/blocks', controller.scan.getBlockList);
router.get('/:eth/transactions', controller.scan.getTxList);
router.get('/:eth/block/:number', controller.scan.getBlock);
router.get('/:eth/transaction/:hash', controller.scan.getTx);

module.exports = router;
