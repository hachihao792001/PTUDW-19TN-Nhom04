const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const User = new Schema(
    {
        _id: { type: Number },
        email: { type: String },
        password: { type: String },
        name: { type: String },
        address: { type: String },
        phone: { type: String },
        balance: { type: Number },
        accessDays: { type: Array },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model("User", User);
