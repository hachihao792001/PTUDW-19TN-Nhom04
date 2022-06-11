const Product = require('../models/Product');
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require('../../utils/mongoose');
const cloudinary = require('../../utils/cloudinary');

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
    cloudinary.uploader.upload(req.file.path).then((result) => {
      Product.findOne({}, { upsert: true })
        .sort({ _id: 'desc' })
        .then((latestCourse) => {
          const formData = req.body;
          formData._id = (latestCourse?._id || 0) + 1;
          formData.image = result.secure_url;
          formData.cloudinaryId = result.public_id;
          const product = new Product(formData);
          product
            .save()
            .then(() => res.redirect('/products'))
            .catch(next);
        });
    });
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let product = await Product.findById(id);
      const formData = req.body;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        await cloudinary.uploader.destroy(product.cloudinaryId);
        formData.image = result.secure_url;
        formData.cloudinaryId = result.public_id;
      } else {
        formData.image = product.secure_url;
        formData.cloudinaryId = product.public_id;
      }
      await Product.findByIdAndUpdate(id, formData, { new: true });
      res.redirect(`/products`);
    } catch (error) {
      console.log(error);
    }
  }

  // [DELETE] /products/:id
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      let product = await Product.findById(id);
      await cloudinary.uploader.destroy(product.cloudinaryId);
      await product.remove();
      res.redirect('/products');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductsController();
