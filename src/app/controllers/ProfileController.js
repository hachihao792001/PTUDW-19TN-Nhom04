const Admin = require("../models/Admin");

class ProfileController {
    //[GET] /profile
    async index(req, res, next) {
        const { userId } = req.body;
        const user = await Admin.findOne({ userId });

        res.render("profile", {
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                balance: user.balance,
                image: user.image,
            },
        });
    }
}

module.exports = new ProfileController();