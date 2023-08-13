const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const sendEmail = require('./sendEmail');

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  // if product is true send email 
  if (product) {
    const to = process.env.EMAIL;
    const subject = 'New Product';
    const text =
      `New product added
           title: ${req.body.title}
           description: ${req.body.description}
           price: ${req.body.price}
           stock: ${req.body.stock}`;
    sendEmail(to, subject, text)
    res.status(201).json({ product });
  }
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.render('products.ejs', { products });
  // res.status(StatusCodes.OK).json({ products });
};

// const getProduct = async (req, res) => {
//   res.send('get Product');
// }


const updateProduct = async (req, res) => {
  const {
    id: productId
  } = req.params;


  const product = await Product.findOneAndUpdate({
    _id: productId
  }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({
    product
  });
};

const deleteProduct = async (req, res) => {
  const {
    id: productId
  } = req.params;

  const product = await Product.findOne({
    _id: productId
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({
    msg: 'Success! Product removed.'
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}