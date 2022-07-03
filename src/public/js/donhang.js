window.addEventListener("DOMContentLoaded", function () {
    $("#settingOrder").on("show.bs.modal", function (event) {
        console.log("update order");

        const button = $(event.relatedTarget);
        const id = button.data("id");
        const name = button.data("name");
        const email = button.data("email");
        const phone = button.data("phone");
        const address = button.data("address");
        const payment = button.data("payment");
        const status = button.data("status");

        const inputName = $("#inputUpdateName");
        const inputEmail = $("#inputUpdateEmail");
        const inputPhone = $("#inputUpdatePhone");
        const inputAddress = $("#inputUpdateAddress");

        const inputPayment = $("#inputUpdatePayment option")
            .removeAttr("selected")
            .filter(`[value='${payment}']`)
            .attr("selected", true);
        const inputStatus = $("#inputUpdateStatus option")
            .removeAttr("selected")
            .filter(`[value='${status}']`)
            .attr("selected", true);
        console.log(status);

        inputName.val(name);
        inputEmail.val(email);
        inputPhone.val(phone);
        inputAddress.val(address);
        // inputPayment.val(payment).change();
        // inputPayment.val(email);

        //ra mảng các {id, quantity}
        const thisOrderProductTuples = orders_products.find(
            (orderProduct) => orderProduct.orderId == id
        ).products;

        const thisOrderProducts = thisOrderProductTuples.map((productTuple) => {
            const product = products.find(
                (product) => product._id == productTuple.id
            );
            product.quantity = productTuple.quantity;
            return product;
        });

        $("#orderProductTableBody").empty();
        thisOrderProducts.forEach((product, index) => {
            const categoryName = categories.find(
                (cate) => cate._id == thisOrderProducts[index].categoryId
            ).name;

            $("#orderProductTableBody").append(`<tr>
                <td scope="row">${product._id}</td>
                <td>
                    <img src="${product.image}"
                        width="40" height="40" class="rounded-circle" />
                </td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${categoryName}</td>
                <td>${product.quantity}</td>
            </tr>`);
        });

        const btnUpdate = $("#btnUpdateOrder");
        btnUpdate.click(function () {
            const form = $("#updateOrderForm");
            form.attr("action", `/orders/${id}?_method=PUT`);
            form.submit();
        });
    });
});
