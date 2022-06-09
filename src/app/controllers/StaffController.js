const Staff = require("../models/Staff");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");

class StaffController {
    //[GET] /staffs
    index(req, res, next) {
        Staff.find({})
            .then((staffs) => {
                res.render("staffs", {
                    staffs: multipleMongooseToObject(staffs),
                });
            })
            .catch(next);
    }

    // [POST] /staffs
    store(req, res, next) {
        Staff.findOne({}, { upsert: true })
            .sort({ _id: "desc" })
            .then((latestCourse) => {
                const formData = req.body;
                formData._id = (latestCourse?._id || 0) + 1;
                const staff = new Staff(formData);
                staff
                    .save()
                    .then(() => res.redirect("/staffs"))
                    .catch(next);
            });
    }

    // [GET] /staffs/:id
    // getStaff(req, res, next) {
    //     const { id } = req.params;
    //     Staff.findById(id)
    //         .then((Staff) => {
    //             res.render("courses/edit", {
    //                 Staff: mongooseToObject(Staff),
    //             });
    //         })
    //         .catch(next);
    // }

    // [PUT] /staffs/:id
    update(req, res, next) {
        const { id } = req.params;
        const formData = req.body;
        Staff.findByIdAndUpdate(id, formData, { new: true })
            .then(() => res.redirect(`/staffs`))
            .catch(next);
    }

    // [DELETE] /staffs/:id
    delete(req, res, next) {
        const { id } = req.params;
        Staff.findByIdAndDelete(id)
            .then(() => res.redirect("/staffs"))
            .catch(next);
    }
}

module.exports = new StaffController();
