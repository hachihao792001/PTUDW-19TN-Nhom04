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

        const { startDate, query } = makeDurationQuery(duration);

        Order.find(query)
            .then((ordersInDurationRange) => {
                ordersInDurationRange = multipleMongooseToObject(ordersInDurationRange);

                Product.find({})
                    .then(async (products) => {
                        products = multipleMongooseToObject(products);

                        res.render("dashboard", {
                            queryDurationString:
                                isFullDuration == 1
                                    ? "Toàn thời gian"
                                    : `${duration} ngày gần nhất`,
                            queryProductString:
                                productID == 0
                                    ? "Mọi đồ uống"
                                    : products.find((p) => p._id == productID)
                                        .name,
                            salesData: {
                                labelsData:
                                    makeArrayOfDateStrings(
                                        startDate,
                                        new Date()
                                    ),
                                salesNumber:
                                    makeSalesNumber(
                                        ordersInDurationRange,
                                        products,
                                        productID,
                                        duration,
                                        startDate
                                    ),
                            },
                            products: products,
                            consumeData: await makeConsumeData(products),
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
}

function makeDurationQuery(duration) {
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

function makeSalesNumber(orders, products, productID, duration, startDate) {
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
                        salesNumber[i] += product.quantity * products.find((p) => p._id == productID).price;
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

async function makeProductsSoldData(products) {
    const productsSoldData = [];
    for (let i = 0; i < products.length; i++) {
        productsSoldData.push(0);
    }

    await Order.find({}).
        then((orders) => {
            orders = multipleMongooseToObject(orders);

            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                for (let j = 0; j < order.products.length; j++) {
                    productsSoldData[order.products[j].id - 1] += order.products[j].quantity;
                }
            }
        });

    return productsSoldData;
}

async function makeConsumeData(products) {
    productsSoldData = await makeProductsSoldData(products);

    products.map((product, index) => {
        product.sold = productsSoldData[index];
        product.percent = (productsSoldData[index] / product.number) * 100;
    });

    return products;
}

module.exports = new DashboardController();
