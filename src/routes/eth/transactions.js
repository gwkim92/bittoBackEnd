const express = require("express");
const router = express.Router();

const controller = require("../../controller/transactionController");

router.post("/mint", controller.mint);

module.exports = router;
