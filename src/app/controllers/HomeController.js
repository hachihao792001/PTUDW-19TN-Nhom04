const Product = require('../models/Product');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../../utils/mongoose');

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

      res.render('index', {
        categories,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new HomeController();
