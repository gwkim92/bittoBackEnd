const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/scannerController');

router.get('/:chain/blocks', controller.scan.getBlockList);
router.get('/:chain/transactions', controller.scan.getTxList);
router.get('/:chain/block/:number', controller.scan.getBlock);
router.get('/:chain/transaction/:hash', controller.scan.getTx);

module.exports = router;
