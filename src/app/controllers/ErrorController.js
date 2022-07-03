class ErrorController {
    //[GET] /about
    index(req, res, next) {
        res.render("error");
    }
}

module.exports = new ErrorController();