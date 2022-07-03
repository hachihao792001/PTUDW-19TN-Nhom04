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

        const btnUpdate = $("#btnUpdateOrder");
        btnUpdate.click(function () {
            const form = $("#updateOrderForm");
            form.attr("action", `/orders/${id}?_method=PUT`);
            form.submit();
        });
    });
});
