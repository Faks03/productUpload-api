const express = require('express');
const router = express.Router();

const {getAllProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/products');
const { uploadProductImage, uploadProductImageLocal } = require('../controllers/uploads');


router.post('/', createProduct)
router.get('/', getAllProducts)
router.route('/uploads').post(uploadProductImage);
router.route('/uploads/local').post(uploadProductImageLocal);


router.get('/product.html', (req, res) => {
    res.render('product.html');
});

router.route('/:id').delete(deleteProduct).patch(updateProduct)

module.exports = router;
