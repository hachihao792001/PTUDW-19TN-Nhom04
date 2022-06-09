class DashboardController {
    index(req, res, next) {
        res.render("dashboard");
    }
}

module.exports = new DashboardController();
