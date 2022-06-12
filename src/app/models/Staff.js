const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");

mongoose.plugin(slug);
mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;

const Staff = new Schema(
    {
        _id: { type: Number },
        image: { type: String },
        cloudinaryId: { type: String },
        name: { type: String },
        status: { type: Boolean },
        phone: { type: String },
    },
    { timestamps: true, _id: false }
);

module.exports = mongoose.model("Staff", Staff);
