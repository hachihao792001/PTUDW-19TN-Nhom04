class ProductsController {
    index(req, res, next) {
        res.render("products");
    }
}

module.exports = new ProductsController();
