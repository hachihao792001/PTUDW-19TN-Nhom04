const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/', productsController.index);
router.post('/', productsController.store);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
