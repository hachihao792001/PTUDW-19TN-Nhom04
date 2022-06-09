const express = require("express");
const router = express.Router();

const ordersController = require("../app/controllers/OrdersController");

router.get("/", ordersController.index);

module.exports = router;
