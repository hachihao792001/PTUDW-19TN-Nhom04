class PaymentController {
    //[GET] /about
    index(req, res, next) {
        res.render("payment");
    }
}

module.exports = new PaymentController();