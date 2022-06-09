const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const Order = new Schema({
    _id: { type: Number },
    customer_id: { type: Number },
    payment: { type: String },
    total: { type: Number },
    date: { type: String },
    status: { type: String },
}, { timestamps: true, _id: false });
module.exports = mongoose.model("Order", Order);