const Product = require("../models/Product");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class PaymentController {
    //[GET] /about
    async index(req, res, next) {
        // get ds sản phẩm
        // let cart = await Cart.find({});
        let products = await Product.find({});
        products = multipleMongooseToObject(products);

        // hard code giỏ hàng
        const cart = [{
                productId: 1,
                quantity: 3,
            },
            {
                productId: 2,
                quantity: 1,
            },
        ];
        const mappedCart = cart.map((item) => {
            const product = products.find(
                (product) => (item.productId = product._id)
            );
            return {
                id: item.productId,
                name: product.name,
                img: product.image,
                price: product.price,
                quantity: item.quantity,
                total: product.price * item.quantity,
            };
        });

        // map productID với product

        // => cart mapped = [{product, quantity}, ...]
        // => đưa vô payment, render ra ở trang payment

        res.render("payment", { mappedCart });
    }
}

module.exports = new PaymentController();