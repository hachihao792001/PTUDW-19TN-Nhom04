const Product = require('../models/Product');
const Category = require('../models/Category');
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose');
const Cart = require('../models/Cart');

class HomeController {
  //[GET] /
  async index(req, res, next) {
    try {
      let products = await Product.find({});
      let categories = await Category.find({});

      products = multipleMongooseToObject(products);
      categories = multipleMongooseToObject(categories).map((category) => {
        return {
          ...category,
          products: products.filter(
            (product) => product.categoryId === category._id
          ),
        };
      });
      const userId = req.userId;

      let AllCarts = await Cart.findOne({ userId });

      let UserCarts = [];

      if (AllCarts) {
        products.forEach((p) => {
          AllCarts.products.forEach((q) => {
            if (p._id == q.productId) {
              UserCarts.push({ ...p, quantity: q.quantity });
            }
          });
        });
      }

      res.render('index', {
        categories,
        cart: UserCarts,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new HomeController();
