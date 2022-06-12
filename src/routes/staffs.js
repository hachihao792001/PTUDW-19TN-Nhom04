const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const staffController = require("../app/controllers/StaffController");

router.get("/", staffController.index);
router.post("/", upload.single("image"), staffController.store);
router.put("/:id", upload.single("image"), staffController.update);
router.delete("/:id", staffController.delete);

module.exports = router;
