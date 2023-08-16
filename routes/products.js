const express = require('express');
const router = express.Router();

const {getAllProducts, createProduct} = require('../controllers/products');
const { uploadProductImage, uploadProductImageLocal } = require('../controllers/uploads');


router.post('/', createProduct)
router.route('/uploads').post(uploadProductImage);
router.route('/uploads/local').post(uploadProductImageLocal);


router.get('/product.html', (req, res) => {
    res.render('product.html');
});



module.exports = router;
