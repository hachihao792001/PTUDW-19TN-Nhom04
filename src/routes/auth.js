const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../utils/multer');

const authController = require('../app/controllers/AuthController');

router.post('/register', upload.single('image'), authController.signUp);
router.post('/login', multer().none(), authController.signIn);
router.get('/logout', authController.logOut);

module.exports = router;
