const express = require("express");
const router = express.Router();

const ordersController = require("../app/controllers/OrdersController");

router.get("/", ordersController.index);

router.get("/", ordersController.index);
router.post("/", ordersController.store);
router.put("/:id", ordersController.update);
router.delete("/:id", ordersController.delete);
module.exports = router;