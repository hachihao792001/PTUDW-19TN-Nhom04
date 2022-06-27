const homeRouter = require('./home');
const aboutRouter = require('./about');
const authRouter = require('./auth');

const route = (app) => {
  app.use('/', homeRouter);
  app.use('/about', aboutRouter);
  app.use('/auth', authRouter);
};

module.exports = route;
