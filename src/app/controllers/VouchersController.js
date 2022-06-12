const Voucher = require("../models/Voucher");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");
class VouchersController {
    //[GET] /vouchers
    index(req, res, next) {
        Voucher.find({})
            .then((vouchers) => {
                res.render("vouchers", {
                    vouchers: multipleMongooseToObject(vouchers),
                });
            })
            .catch(next);
    }

    // [POST] /vouchers
    store(req, res, next) {
        Voucher.findOne({}, { upsert: true })
            .sort({ _id: "desc" })
            .then((latestVoucher) => {
                const formData = req.body;
                formData._id = (latestVoucher?._id || 0) + 1;
                const voucher = new Voucher(formData);
                voucher
                    .save()
                    .then(() => res.redirect("/vouchers"))
                    .catch(next);
            });
    }

    // [GET] /vouchers/:id
    // getVoucher(req, res, next) {
    //     const { id } = req.params;
    //     Voucher.findById(id)
    //         .then((Voucher) => {
    //             res.render("courses/edit", {
    //                 Voucher: mongooseToObject(Voucher),
    //             });
    //         })
    //         .catch(next);
    // }

    // [PUT] /vouchers/:id
    update(req, res, next) {
        const { id } = req.params;
        const formData = req.body;
        Voucher.findByIdAndUpdate(id, formData, { new: true })
            .then(() => res.redirect(`/vouchers`))
            .catch(next);
    }

    // [DELETE] /vouchers/:id
    delete(req, res, next) {
        const { id } = req.params;
        Voucher.findByIdAndDelete(id)
            .then(() => res.redirect("/vouchers"))
            .catch(next);
    }
}

module.exports = new VouchersController();
