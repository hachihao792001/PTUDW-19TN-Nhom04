const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");
const { getOrderProducts } = require("../../utils/OrderUtils");

class OrdersController {
    //[GET] /Orders
    index(req, res, next) {
        Order.find({})
            .then(async (orders) => {
                orders = multipleMongooseToObject(orders);

                const orders_products = await Promise.all(
                    orders.map(async (order) => {
                        return {
                            orderId: order._id,
                            products: await getOrderProducts(order),
                        };
                    })
                );

                var products = await Product.find({});
                products = multipleMongooseToObject(products);
                var categories = await Category.find({});
                categories = multipleMongooseToObject(categories);

                res.render("orders", {
                    orders: orders,
                    products: products,
                    categories: categories,
                    orders_products: orders_products,
                });
            })
            .catch(next);
    }

    // [POST] /orders
    store(req, res, next) {
        Order.findOne({}, { upsert: true })
            .sort({ _id: "desc" })
            .then((latestOrder) => {
                const formData = req.body;
                formData._id = (latestOrder._id || 0) + 1;
                const order = new Order(formData);
                order
                    .save()
                    .then(() => res.redirect("/orders"))
                    .catch(next);
            });
    }

    // [PUT] /orders/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const formData = req.body;

            console.log(formData);

            await Order.findByIdAndUpdate(id, formData, { new: true });
            res.redirect(`/orders`);
        } catch (error) {
            console.log(error);
        }
    }

    // [DELETE] /orders/:id
    async delete(req, res, next) {
        const { id } = req.params;
        try {
            let order = await Order.findById(id);
            await cloudinary.uploader.destroy(order.cloudinaryId);
            await order.remove();
            res.redirect("/orders");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new OrdersController();
