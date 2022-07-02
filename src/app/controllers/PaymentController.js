class PaymentController {
    //[GET] /about
    index(req, res, next) {
        // get ds sản phẩm

        // hard code giỏ hàng
        // const cart = [
        // 	{
        // 		productId,
        // 		quantity
        // 	},...
        // ]

        // map productID với product

        // => cart mapped = [{product, quantity}, ...]
        // => đưa vô payment, render ra ở trang payment

        res.render("payment");
    }
}

module.exports = new PaymentController();
