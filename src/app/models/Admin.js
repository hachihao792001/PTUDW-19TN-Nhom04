const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdater = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const Admin = new Schema(
  {
    _id: { type: Number },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    name: { type: String },
    phone: { type: String },
    status: { type: Number },
  },
  { timestamps: true, _id: false }
);
module.exports = mongoose.model('Admin', Admin);
