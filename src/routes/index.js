const homeRouter = require("./home");
const aboutRouter = require("./about");

const route = (app) => {
    app.use("/", homeRouter);
    app.use("/about", aboutRouter);
};

module.exports = route;
