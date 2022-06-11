const express = require('express');
const router = express.Router();

const vouchersController = require('../app/controllers/VouchersController');

router.get('/', vouchersController.index);
router.post('/', vouchersController.store);
router.put('/:id', vouchersController.update);
router.delete('/:id', vouchersController.delete);

module.exports = router;
