const express = require('express');
const router = express.Router();
const multer = require('multer');

const orderController = require('../app/controllers/OrderController');

router.post('/', multer().none(), orderController.Add);

module.exports = router;
