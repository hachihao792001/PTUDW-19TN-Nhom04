const express = require("express");
const router = express.Router();

const staffController = require("../app/controllers/StaffController");

router.get("/", staffController.index);
router.post("/", staffController.store);
router.put("/:id", staffController.update);
router.delete("/:id", staffController.delete);

module.exports = router;
