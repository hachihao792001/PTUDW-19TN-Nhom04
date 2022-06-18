const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/', authController.index);
router.post('/', authController.signUp);

module.exports = router;
