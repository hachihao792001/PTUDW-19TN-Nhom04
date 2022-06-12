window.addEventListener("DOMContentLoaded", function () {
    $("#settingProduct").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const name = button.data("name");
        const description = button.data("description");
        const price = button.data("price");
        const number = button.data("number");
        const inputName = $("#inputUpdateName");
        const inputDescription = $("#inputUpdateDescription");
        const inputPrice = $("#inputUpdatePrice");
        const inputNumber = $("#inputUpdateNumber");

        inputName.val(name);
        inputDescription.val(description);
        inputPrice.val(price);
        inputNumber.val(number);

        const btnUpdate = $("#btnUpdateProduct");
        btnUpdate.click(function () {
            const form = $("#updateProductForm");
            form.attr("action", `/products/${id}?_method=PUT`);
            form.submit();
        });
    });

    $("#confirmDeleteModal").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const btnDeleteProduct = $("#btn-delete-product");
        btnDeleteProduct.click(function () {
            const deleteForm = document.forms["delete-product-form"];
            deleteForm.action = "/products/" + id + "?_method=DELETE";
            deleteForm.submit();
        });
    });
});
