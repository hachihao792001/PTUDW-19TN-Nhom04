const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
    {
        _id: { type: Number },
        image: { type: String },
        cloudinaryId: { type: String },
        name: { type: String },
        balance: { type: Number },
        phone: { type: String },
        address: { type: String },
        accessDays: { type: String },
    },
    { timestamps: true, _id: false }
);
module.exports = mongoose.model("User", User);
