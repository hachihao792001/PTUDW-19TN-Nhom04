const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");
const { isEmail } = require("validator");
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const Admin = new Schema(
    {
        _id: { type: Number },
        email: {
            type: String,
            required: [true, "Xin hãy nhập email"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Xin nhập email hợp lệ"],
        },
        password: {
            type: String,
            required: [true, "Xin hãy nhập mật khẩu"],
            minlength: [6, "Độ dài của mật khẩu ít nhất là 6 kí tự"],
        },
        name: { type: String },
        phone: { type: String },
        status: { type: Number },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model("Admin", Admin);
