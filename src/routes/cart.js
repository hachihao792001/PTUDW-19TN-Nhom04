const express = require('express');
const router = express.Router();
const multer = require('multer');

const cartController = require('../app/controllers/CartController');

router.post('/', multer().none(), cartController.Change);
router.delete('/', multer().none(), cartController.Delete);

module.exports = router;
