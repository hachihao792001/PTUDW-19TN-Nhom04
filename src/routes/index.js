const homeRouter = require("./home");
const aboutRouter = require("./about");
const authRouter = require("./auth");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const paymentRouter = require("./payment");
const errorRouter = require("./error");
const profileRouter = require("./profile");
const successRouter = require("./success");
const { auth, assignUserAvatar } = require("../middleware/auth-middlewares");

const route = (app) => {
  app.use("/", assignUserAvatar, homeRouter);
  app.use("/about", aboutRouter);
  app.use("/error", errorRouter);
  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/cart", auth, cartRouter);
  app.use("/order", auth, orderRouter);
  app.use("/success", successRouter);
  app.use("/payment", assignUserAvatar, paymentRouter);
};

module.exports = route;
