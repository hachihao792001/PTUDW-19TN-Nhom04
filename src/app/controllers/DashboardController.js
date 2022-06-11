const Order = require("../models/Order");
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require("../../utils/mongoose");

const SHOP_START_DATE = "01-01-2022";

class DashboardController {
    index(req, res, next) {
        var duration = req.query.duration || 7;
        const product = req.query.product || 0;

        if (duration == -1) {
            //SHOP_START_DATE
            duration = daysBetween(new Date(SHOP_START_DATE), new Date());
        }

        const { startDate, query } = createDurationQuery(duration);

        Order.find(query)
            .then((orders) => {
                orders = multipleMongooseToObject(orders);

                const fullDurationOrders = makeFullDurationOrders(
                    orders,
                    duration,
                    startDate
                );

                res.render("dashboard", {
                    dropdown_placeholder: `${duration} ngày gần nhất`,
                    dashboardData: {
                        labelsData: fullDurationOrders.map((order) =>
                            new Date(order.date).toLocaleDateString("vi-VN")
                        ),
                        salesData: fullDurationOrders.map(
                            (order) => order.total
                        ),
                    },
                });
            })
            .catch(next);
    }
}

function createDurationQuery(duration) {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - duration);
    const endDate = today;

    const query = {
        date: {
            $gte: startDate,
            $lt: endDate,
        },
    };

    return { startDate, query };
}

// Make an array with length=duration, each element is either an existing order or an placeholder order (total=0)
// Index 0 is the order at startDate, index duration-1 is the order at endDate
function makeFullDurationOrders(orders, duration, startDate) {
    const fullDurationOrders = new Array(duration).fill(undefined);

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

module.exports = new DashboardController();
