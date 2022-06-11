const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const productsController = require('../app/controllers/ProductsController');

router.get('/', productsController.index);
router.post('/', upload.single('image'), productsController.store);
router.put('/:id', upload.single('image'), productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
