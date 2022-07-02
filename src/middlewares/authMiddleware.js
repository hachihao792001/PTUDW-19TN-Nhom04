const jwt = require("jsonwebtoken");
const Admin = require("../app/models/Admin");

const auth = (req, res, next) => {
    const token = req.cookies.token;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/");
            } else {
                //console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/");
    }
};

const assignAdminAvatar = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.avatar = "";
                next();
            } else {
                let admin = await Admin.findById(decodedToken.adminId);
                res.locals.avatar = admin.image;
                next();
            }
        });
    } else {
        res.locals.avatar = null;
        next();
    }
};

module.exports = { auth, assignAdminAvatar };
