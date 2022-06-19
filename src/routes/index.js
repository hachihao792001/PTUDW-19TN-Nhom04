const dashboardRouter = require("./dashboard");
const staffsRouter = require("./staffs");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const vouchersRouter = require("./vouchers");
const authRouter = require("./auth");

const { auth, assignAdminAvatar } = require("../middlewares/authMiddleware");

const route = (app) => {
    app.get("*", assignAdminAvatar);

    app.use("/", authRouter);
    app.use("/dashboard", auth, dashboardRouter);
    app.use("/staffs", auth, staffsRouter);
    app.use("/orders", auth, ordersRouter);
    app.use("/products", auth, productsRouter);
    app.use("/vouchers", auth, vouchersRouter);
};

module.exports = route;
