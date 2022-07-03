const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdater = require('mongoose-slug-updater');

mongoose.plugin(slug);
mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    _id: { type: Number },
    userId: { type: Number },
    products: [
      {
        productId: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model('Cart', Cart);
