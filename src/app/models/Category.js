const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");

mongoose.plugin(slug);
mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true, _id: false }
);

module.exports = mongoose.model("Category", Category);
