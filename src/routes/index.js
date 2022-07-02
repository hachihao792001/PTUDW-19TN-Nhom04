const homeRouter = require('./home');
const aboutRouter = require('./about');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const paymentRouter = require('./payment');

const { auth, assignUserAvatar } = require('../middleware/auth-middlewares');

const route = (app) => {
  app.use('/', assignUserAvatar, homeRouter);
  app.use('/about', aboutRouter);
  app.use('/auth', authRouter);
  app.use('/cart', auth, cartRouter);
  app.use('/order', auth, orderRouter);
  app.use('/payment', assignUserAvatar, paymentRouter);
};

module.exports = route;
