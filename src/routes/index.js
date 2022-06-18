const dashboardRouter = require('./dashboard');
const staffsRouter = require('./staffs');
const ordersRouter = require('./orders');
const productsRouter = require('./products');
const vouchersRouter = require('./vouchers');
const authRouter = require('./auth');

const route = (app) => {
  app.use('/', authRouter);
  app.use('/dashboard', dashboardRouter);
  app.use('/staffs', staffsRouter);
  app.use('/orders', ordersRouter);
  app.use('/products', productsRouter);
  app.use('/vouchers', vouchersRouter);
};

module.exports = route;
