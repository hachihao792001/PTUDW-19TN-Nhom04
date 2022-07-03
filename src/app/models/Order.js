const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const slugUpdater = require("mongoose-slug-updater");
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const Order = new Schema(
    {
        _id: { type: Number },
        cartId: { type: Number },
        customer_id: { type: Number },
        payment: { type: Boolean },
        total: { type: Number },
        date: { type: Date },
        status: { type: String },
        customer_name: { type: String },
        customer_email: { type: String },
        customer_phone: { type: String },
        customer_address: { type: String },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model("Order", Order);
