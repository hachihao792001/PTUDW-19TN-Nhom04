const homeRouter = require("./home");
const aboutRouter = require("./about");
const authRouter = require("./auth");
const paymentRouter = require("./payment");
const { auth, assignUserAvatar } = require("../middleware/auth-middlewares");

const route = (app) => {
    app.use("/", assignUserAvatar, homeRouter);
    app.use("/about", aboutRouter);
    app.use("/auth", authRouter);
    app.use("/payment", paymentRouter);
};

module.exports = route;