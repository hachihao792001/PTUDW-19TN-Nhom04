class SuccessController {
  //[GET] /about
  index(req, res, next) {
    res.render("success");
  }
}

module.exports = new SuccessController();
