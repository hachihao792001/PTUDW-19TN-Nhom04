const Order = require("../models/Order");
const Product = require("../models/Product");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");

const SHOP_START_DATE = "01-01-2022";

class DashboardController {
    index(req, res, next) {
        var duration = req.query.duration || 7;
        const product = req.query.product || 0;

        var isFullDuration = 0;

        if (duration == 0) {
            isFullDuration = 1;
            duration = daysBetween(new Date(SHOP_START_DATE), new Date());
        } else if (duration < 0) {
            duration = 7;
        }

        const { startDate, query } = createSalesQuery(duration, product);

        Order.find(query)
            .then((orders) => {
                orders = multipleMongooseToObject(orders);

                const fullDurationOrders = makeFullDurationOrders(
                    orders,
                    duration,
                    startDate
                );

                Product.find({})
                    .then((products) => {
                        res.render("dashboard", {
                            queryDurationString:
                                isFullDuration == 1
                                    ? "Toàn thời gian"
                                    : `${duration} ngày gần nhất`,
                            queryProductString:
                                product == 0
                                    ? "Mọi đồ uống"
                                    : products.find((p) => p.id == product)
                                        .name,
                            salesData: {
                                labelsData: fullDurationOrders.map((order) =>
                                    new Date(order.date).toLocaleDateString(
                                        "vi-VN"
                                    )
                                ),
                                salesNumber: fullDurationOrders.map(
                                    (order) => order.total
                                ),
                            },
                            products: multipleMongooseToObject(products),
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
}

function createSalesQuery(duration, product) {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - duration + 1);
    const endDate = today;

    const query = {
        date: {
            $gte: startDate,
            $lt: endDate,
        },
    };

    if (product > 0) query.product = product;

    return { startDate, query };
}

// Make an array with length=duration, each element is either an existing order or an placeholder order (total=0)
// Index 0 is the order at startDate, index duration-1 is the order at endDate
function makeFullDurationOrders(orders, duration, startDate) {
    const fullDurationOrders = [];
    for (let i = 0; i < duration; i++) {
        fullDurationOrders.push(undefined);
    }

    for (let i = 0; i < orders.length; i++) {
        const dateIndex = daysBetween(startDate, orders[i].date);
        fullDurationOrders[dateIndex] = orders[i];
    }

    fullDurationOrders.forEach((order, index) => {
        if (order === undefined) {
            thisOrderDate = new Date(startDate);
            thisOrderDate.setDate(startDate.getDate() + index);

            fullDurationOrders[index] = {
                date: thisOrderDate,
                total: 0,
            };
        }
    });

    return fullDurationOrders;
}

function daysBetween(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
        Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    );
    return diffDays;
}

// để sau
// function makeConsumeData(products) {
//     result = [];
//     products.forEach((product) => {
//         var thisProductConsumeData = {
//             id: product.id,
//             image: product.image,
//             name: product.name,
//         };

//         Order.find({}).then((orders) => {});
//     });
// }

module.exports = new DashboardController();
