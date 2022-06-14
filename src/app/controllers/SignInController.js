class SignInController {
  index(req, res, next) {
    res.render('signin', { layout: false });
  }
}

module.exports = new SignInController();
