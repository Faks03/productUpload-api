const express = require('express');
const router = express.Router();

const {updateProduct, deleteProduct, getAllProducts} = require('../controllers/products');

router.get('/', getAllProducts)
router.route('/:id').delete(deleteProduct).patch(updateProduct)

module.exports = router;