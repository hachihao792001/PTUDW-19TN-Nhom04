const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

class SignInController {
    index(req, res, next) {
        res.render("signin", { layout: false });
    }

    async signUp(req, res, next) {
        console.log(req.body);
        // const formData = req.body;
        // const email = formData.email;
        const { email, password, phone, name } = req.body;
        let existingAdmin, _id;

        try {
            existingAdmin = await Admin.findOne({ email });
        } catch (error) {
            return next(error);
        }

        if (existingAdmin) {
            const error = new Error("User exists already", 422);
            return next(error);
        }

        // Get ID
        const latestAdmin = await Admin.findOne({}, { upsert: true }).sort({
            _id: "desc",
        });
        _id = (latestAdmin?._id || 0) + 1;

        let hashPassword;
        // let password = formData.password;
        try {
            const salt = bcrypt.genSaltSync(10);
            hashPassword = bcrypt.hashSync(password, salt);
        } catch (error) {
            return next(error);
        }
        console.log(_id);
        // formData.password = hashPassword;
        const createAdmin = new Admin({
            email,
            name,
            phone,
            password: hashPassword,
            _id,
        });

        try {
            await createAdmin.save();
        } catch (error) {
            next(error);
        }

        let token;
        try {
            token = jwt.sign(
                { adminId: createAdmin._id, email: createAdmin.email },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
        } catch (error) {
            next(error);
        }

        res.status(201).json({
            adminId: createAdmin._id,
            email: createAdmin.email,
            password: createAdmin.password,
            token: token,
        });
    }

    async signIn(req, res, next) {
        const formData = req.body;

        let existingAdmin;
        let email = formData.email;
        try {
            existingAdmin = await Admin.findOne({ email });
        } catch (err) {
            return next(error);
        }

        if (!existingAdmin) {
            res.json({ message: "Admin Account Not Found" });
            return;
        }

        let isValidPassword = false;

        isValidPassword = bcrypt.compareSync(
            formData.password,
            existingAdmin.password
        );

        if (!isValidPassword) {
            return next(error);
        }

        let token;
        try {
            token = jwt.sign(
                { adminId: existingAdmin._id, email: existingAdmin.email },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
        } catch (err) {
            return next(error);
        }

        res.cookie("token", token);
        res.redirect("/dashboard");
    }

    logOut = (req, res) => {
        res.cookie("token", "", { maxAge: 1 });
        res.redirect("/");
    };
}

module.exports = new SignInController();
