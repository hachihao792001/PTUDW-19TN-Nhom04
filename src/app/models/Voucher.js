const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdater = require('mongoose-slug-updater');

mongoose.plugin(slug);
mongoose.plugin(slugUpdater);

const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    _id: { type: Number },
    code: { type: String },
    remain: { type: Number },
    status: { type: String }, // True: Hoạt động, False: Hết hạn
    type: { type: String },
    condition: { type: Number }, //  Trên condition tiền để được khuyến mãi
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model('Voucher', Voucher);
