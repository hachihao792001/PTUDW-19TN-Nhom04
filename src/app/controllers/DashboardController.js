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
        const productID = req.query.product || 0;

        var isFullDuration = 0;

        if (duration == 0) {
            isFullDuration = 1;
            duration = daysBetween(new Date(SHOP_START_DATE), new Date());
        } else if (duration < 0) {
            duration = 7;
        }

        const { startDate, query } = createDurationQuery(duration);

        Order.find(query)
            .then((ordersInDurationRange) => {
                ordersInDurationRange = multipleMongooseToObject(ordersInDurationRange);

                Product.find({})
                    .then((products) => {
                        res.render("dashboard", {
                            queryDurationString:
                                isFullDuration == 1
                                    ? "Toàn thời gian"
                                    : `${duration} ngày gần nhất`,
                            queryProductString:
                                productID == 0
                                    ? "Mọi đồ uống"
                                    : products.find((p) => p.id == productID)
                                        .name,
                            salesData: {
                                labelsData:
                                    makeArrayOfDateStrings(
                                        startDate,
                                        new Date()
                                    ),
                                salesNumber:
                                    createSalesNumber(
                                        ordersInDurationRange,
                                        products,
                                        productID,
                                        duration,
                                        startDate
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

function createDurationQuery(duration) {
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

    return { startDate, query };
}

function createSalesNumber(orders, products, productID, duration, startDate) {
    const salesNumber = [];
    for (let i = 0; i < duration; i++) {
        salesNumber.push(0);
    }

    var curentDate = new Date(startDate);
    for (let i = 0; i < duration; i++) {
        const ordersThisDate = orders.filter((order) =>
            isSameDate(order.date, curentDate)
        );
        ordersThisDate.forEach((order) => {
            if (productID == 0)
                salesNumber[i] += order.total;
            else {
                order.products.find((product) => {
                    if (product.id == productID) {
                        salesNumber[i] += product.quantity * products.find((p) => p.id == productID).price;
                    }
                });
            }
        });
        curentDate.setDate(curentDate.getDate() + 1);
    }
    return salesNumber;
}

function daysBetween(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
        Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    );
    return diffDays;
}

function makeArrayOfDateStrings(startDate, endDate) {
    const arrayOfDateStrings = [];
    const count = daysBetween(startDate, endDate) + 1;

    for (let i = 0; i < count; i++) {
        const thisDate = new Date(startDate);
        thisDate.setDate(startDate.getDate() + i);
        arrayOfDateStrings.push(thisDate.toLocaleDateString(
            "vi-VN"
        ));
    }

    return arrayOfDateStrings;
}

function isSameDate(date1, date2) {
    return (
        date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()
    );
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
