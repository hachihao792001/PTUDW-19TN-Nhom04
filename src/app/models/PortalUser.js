const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdater = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdater);
const Schema = mongoose.Schema;
const PortalUser = new Schema(
  {
    username: { type: String },
    name: { type: String },
    password: { type: String },
  },
  { timestamps: true, _id: false }
);
module.exports = mongoose.model('PortalUser', PortalUser);
