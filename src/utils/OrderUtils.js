const Cart = require("../app/models/Cart");
const { mongooseToObject, multipleMongooseToObject } = require("./mongoose");

getOrderProducts = async (order) => {
    var orderCart = await Cart.findOne({ _id: order.cartId });
    if (orderCart !== null) {
        orderCart = mongooseToObject(orderCart);
        const orderProducts = orderCart.products;
        return orderProducts;
    } else return [];
};

module.exports = {
    getOrderProducts,
};
