window.addEventListener("DOMContentLoaded", function () {
    $("#settingProduct").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const name = button.data("name");
        const description = button.data("description");
        const price = button.data("price");
        const number = button.data("number");
        const categoryId = button.data("categoryid");
        const inputName = $("#inputUpdateName");
        const inputDescription = $("#inputUpdateDescription");
        const inputPrice = $("#inputUpdatePrice");
        const inputNumber = $("#inputUpdateNumber");
        const categoryDropdownButton = $("#editCategoryDropdownButton");

        editingProductID = id;
        editingProductCategoryID = categoryId;

        inputName.val(name);
        inputDescription.val(description);
        inputPrice.val(price);
        inputNumber.val(number);

        const editingProductCategory = categories.filter(
            (category) => category._id == editingProductCategoryID
        )[0];
        categoryDropdownButton.text(editingProductCategory.name);

        const btnUpdate = $("#btnUpdateProduct");
        btnUpdate.click(function () {
            const form = $("#updateProductForm");
            form.attr("action", `/products/${id}?_method=PUT`);
            form.submit(function (eventObj) {
                $(this).append(
                    `<input type="hidden" name="categoryId" value="${editingProductCategoryID}" /> `
                );
                return true;
            });
            form.submit();
        });
    });

    $("#modal_AddProduct").on("show.bs.modal", function (event) {
        const categoryDropdownButton = $("#addCategoryDropdownButton");
        categoryDropdownButton.text(categories[0].name);

        editingProductCategoryID = 1;

        const btnAdd = $("#btnAddProduct");
        btnAdd.click(function () {
            const form = $("#addProductForm");
            form.attr("action", `/products?_method=POST`);
            form.submit(function (eventObj) {
                $(this).append(
                    `<input type="hidden" name="categoryId" value="${editingProductCategoryID}" /> `
                );
                return true;
            });
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
