class OrdersController {
    index(req, res, next) {
        res.render("orders");
    }
}

module.exports = new OrdersController();
