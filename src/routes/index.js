const homeRouter = require('./home');
const aboutRouter = require('./about');
const authRouter = require('./auth');

const { auth, assignUserAvatar } = require('../middleware/auth-middlewares');

const route = (app) => {
  app.use('/', assignUserAvatar, homeRouter);
  app.use('/about', aboutRouter);
  app.use('/auth', authRouter);
};

module.exports = route;
