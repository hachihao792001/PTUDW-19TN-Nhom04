const Staff = require("../models/Staff");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");
const cloudinary = require("../../utils/cloudinary");

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
        cloudinary.uploader.upload(req.file.path).then((result) => {
            Staff.findOne({}, { upsert: true })
                .sort({ _id: "desc" })
                .then((latestStaff) => {
                    const formData = req.body;
                    formData._id = (latestStaff?._id || 0) + 1;
                    formData.image = result.secure_url;
                    formData.cloudinaryId = result.public_id;
                    const staff = new Staff(formData);
                    staff
                        .save()
                        .then(() => res.redirect("/staffs"))
                        .catch(next);
                });
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

    async update(req, res, next) {
        try {
            const { id } = req.params;
            let staff = await Staff.findById(id);
            const formData = req.body;

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                await cloudinary.uploader.destroy(staff.cloudinaryId);
                formData.image = result.secure_url;
                formData.cloudinaryId = result.public_id;
            } else {
                formData.image = staff.secure_url;
                formData.cloudinaryId = staff.public_id;
            }
            await Staff.findByIdAndUpdate(id, formData, { new: true });
            res.redirect(`/staffs`);
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /staffs/:id
    delete(req, res, next) {
        const { id } = req.params;
        Staff.findByIdAndDelete(id)
            .then(async (staff) => {
                await cloudinary.uploader.destroy(staff.cloudinaryId);
                res.redirect("/staffs");
            })
            .catch(next);
    }
}

module.exports = new StaffController();
