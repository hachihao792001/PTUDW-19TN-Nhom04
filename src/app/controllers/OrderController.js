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
      order = await Order.find({ customer_id: userId });
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
    Order.findOne({}, { upsert: true })
      .sort({ _id: 'desc' })
      .then((latestOrder) => {
        const formData = req.body;
        const now = new Date();
        const id = (latestOrder._id || 0) + 1;
        formData._id = id;
        formData.cartId = id;
        formData.status = 'new';
        formData.customer_id = req.userId;
        formData.date = now.getDate();
        const order = new Order(formData);
        order
          .save()
          .then(() => res.redirect('/'))
          .catch(next);
      });
  }
}

module.exports = new OrderController();
