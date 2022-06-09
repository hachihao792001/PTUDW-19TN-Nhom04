class VouchersController {
    index(req, res, next) {
        res.render("vouchers");
    }
}

module.exports = new VouchersController();
