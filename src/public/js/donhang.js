window.addEventListener("DOMContentLoaded", function() {
    $("#settingOrder").on("show.bs.modal", function(event) {
        console.log("update order");

        const button = $(event.relatedTarget);
        const id = button.data("id");
        const name = button.data("name");
        const email = button.data("email");
        const payment = button.data("payment");
        const status = button.data("status");

        const inputName = $("#inputUpdateName");
        const inputEmail = $("#inputUpdateEmail");
        const inputPayment = $("#inputUpdatePayment");
        const inputPhone = $("#inputUpdatePhone");
        const inputStatus = $("#inputUpdateStatus");
        console.log("name".name);

        inputName.val(name);
        inputEmail.val(email);

        const btnUpdate = $("#btnUpdateOrder");
        btnUpdate.click(function() {
            const form = $("#updateOrderForm");
            form.attr("action", `/orders/${id}?_method=PUT`);
            form.submit();
        });
    });


});