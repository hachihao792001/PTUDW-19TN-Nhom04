const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const Admin = new Schema(
    {
        _id: { type: Number },
        email: { type: String },
        password: { type: String },
        name: { type: String },
        phone: { type: String },
        status: { type: Number },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model("Admin", Admin);
