const express = require("express");
const router = express.Router();
const multer = require("multer");

const authController = require("../app/controllers/AuthController");

router.get("/", authController.index);
router.post("/", authController.signUp);
router.post("/login", multer().none(), authController.signIn);
router.get("/logout", authController.logOut);

module.exports = router;
