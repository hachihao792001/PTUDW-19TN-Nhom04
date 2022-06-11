class DashboardController {
    index(req, res, next) {
        res.render("dashboard", {
            dashboardData: {
                salesData: [65, 59, 80, 81, 56, 55, 40],
            },
        });
    }
}

module.exports = new DashboardController();
