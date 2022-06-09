const express = require("express");
const router = express.Router();

const vouchersController = require("../app/controllers/VouchersController");

router.get("/", vouchersController.index);

module.exports = router;
