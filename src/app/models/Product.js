const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");

mongoose.plugin(slug);
mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        _id: { type: Number },
        image: { type: String },
        cloudinaryId: { type: String },
        name: { type: String },
        number: { type: Number },
        price: { type: Number },
        description: { type: String },
        categoryId: { type: Number },
        slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true, _id: false }
);

module.exports = mongoose.model("Product", Product);
