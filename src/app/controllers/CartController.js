const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose');

class CartController {
  //[POST] /
  async Change(req, res, next) {
    const { userId, productId, quantity } = req.body;
    let currentCart;
    let product, productIndex;
    let currentProduct;
    try {
      currentCart = await Cart.findOne({ userId });
    } catch (error) {
      return next(error);
    }

    if (!currentCart) {
      return new Error('Cart is not found');
    }

    // Check product Id exists

    try {
      currentProduct = await Product.findById(productId);
    } catch (error) {
      return next(error);
    }

    if (!currentProduct) {
      res.status(404).json({ mess: 'Unvalid product ID' });
      return;
    }

    const products = currentCart.products;

    // Check if product exist in Cart
    product = products.find((o) => o.productId == productId);
    productIndex = products.findIndex((o) => o.productId == productId);
    if (!product) {
      const newProduct = {
        productId,
        quantity,
      };

      currentCart.products.push(newProduct);

      try {
        await currentCart.save();
        res.status(201).json({ mess: 'Create successfully' });
      } catch (error) {
        return next(error);
      }
    } else {
      currentCart.products[productIndex].quantity = quantity;

      try {
        await currentCart.save();
        res.status(200).json({ mess: 'Cart update' });
      } catch (error) {
        return next(error);
      }
    }
  }

  async Delete(req, res, next) {
    const { userId, productId } = req.body;
    let currentCart;
    let product;
    let currentProduct;
    try {
      currentCart = await Cart.findOne({ userId });
    } catch (error) {
      return next(error);
    }

    if (!currentCart) {
      return new Error('Cart is not found');
    }

    // Check product Id exists

    try {
      currentProduct = await Product.findById(productId);
    } catch (error) {
      return next(error);
    }

    if (!currentProduct) {
      res.status(404).json({ mess: 'Unvalid product ID' });
      return;
    }

    const products = currentCart.products;

    // Check if product exist in Cart
    product = products.find((o) => o.productId == productId);

    if (!product) {
      res.status(404).json({ mess: 'Unfound product in Cart' });
      return;
    } else {
      currentCart.products = products.filter((p) => p.productId != productId);
      await currentCart.save();
      res.status(200).json({ mess: 'Cart delete' });
    }
  }
}

module.exports = new CartController();
