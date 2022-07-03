const jwt = require("jsonwebtoken");
const User = require("../app/models/User");

const auth = (req, res, next) => {
    const token = req.cookies.token;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/");
    }
};

const assignUserAvatar = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async(err, decodedToken) => {
            if (err) {
                res.locals.avatar = "";
                next();
            } else {
                let user = await User.findById(decodedToken.userId);
                res.locals.avatar = user.image;
                req.userId = user._id;
                next();
            }
        });
    } else {
        res.locals.avatar = null;
        next();
    }
};

module.exports = { auth, assignUserAvatar };