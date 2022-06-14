class AboutController {
    //[GET] /about
    index(req, res, next) {
        res.render("about");
    }
}

module.exports = new AboutController();
