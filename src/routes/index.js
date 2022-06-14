const dashboardRouter = require('./dashboard');
const staffsRouter = require('./staffs');
const ordersRouter = require('./orders');
const productsRouter = require('./products');
const vouchersRouter = require('./vouchers');
const signInRouter = require('./signin');

const route = (app) => {
  app.use('/', dashboardRouter);
  app.use('/staffs', staffsRouter);
  app.use('/orders', ordersRouter);
  app.use('/products', productsRouter);
  app.use('/vouchers', vouchersRouter);
  app.use('/signin', signInRouter);
};

module.exports = route;
