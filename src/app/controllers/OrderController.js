const Order = require('../models/Order');
const cloudinary = require('../../utils/cloudinary');

const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose');

class OrderController {
  async Get(req, res, next) {
    const { userId } = req.params;
    let order;
    try {
      order = await Order.find({ cartId: userId });
    } catch (error) {
      console.log(error);
      return next(error);
    }
    order = multipleMongooseToObject(order);
    const orders = order.map((o, index) => {
      return { ...o, index: index + 1 };
    });
    // console.log('Order', order);
    res.render('order', { orders: orders });
  }
  //[POST] /
  async Add(req, res, next) {
    cloudinary.uploader.upload(req.file.path).then((result) => {
      Order.findOne({}, { upsert: true })
        .sort({ _id: 'desc' })
        .then((latestOrder) => {
          const formData = req.body;
          formData._id = (latestOrder._id || 0) + 1;
          formData.image = result.secure_url;
          formData.cloudinaryId = result.public_id;
          formData.status = 'new';
          formData.customer_id = req.userId;

          const order = new Order(formData);
          order
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
        });
    });
  }
}

module.exports = new OrderController();
