const Product = require('../models/Product');
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require('../../utils/mongoose');
class ProductsController {
  //[GET] /products
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render('products', {
          products: multipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  // [POST] /products
  store(req, res, next) {
    Product.findOne({}, { upsert: true })
      .sort({ _id: 'desc' })
      .then((latestCourse) => {
        const formData = req.body;
        formData._id = (latestCourse?._id || 0) + 1;
        const product = new Product(formData);
        product
          .save()
          .then(() => res.redirect('/products'))
          .catch(next);
      });
  }

  update(req, res, next) {
    const { id } = req.params;
    const formData = req.body;
    Product.findByIdAndUpdate(id, formData, { new: true })
      .then(() => res.redirect(`/products`))
      .catch(next);
  }

  // [DELETE] /products/:id
  delete(req, res, next) {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
      .then(() => res.redirect('/products'))
      .catch(next);
  }
}

module.exports = new ProductsController();
