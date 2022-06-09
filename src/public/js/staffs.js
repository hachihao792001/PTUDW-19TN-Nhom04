window.addEventListener("DOMContentLoaded", function () {
    $("#settingStaff").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const name = button.data("name");
        const phone = button.data("phone");
        const inputName = $("#inputUpdateName");
        const inputPhone = $("#inputUpdatePhone");
        const inputUpdateStatus = $(
            "#updateStaffForm input:radio[name=status]"
        );
        inputName.val(name);
        inputPhone.val(phone);
        const btnUpdate = $("#btnUpdateStaff");
        btnUpdate.click(function () {
            const form = $("#updateStaffForm");
            form.attr("action", `/staffs/${id}?_method=PUT`);
            form.submit();
        });
    });

    $("#confirmDeleteModal").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        const btnDeleteCourse = $("#btn-delete-staff");
        btnDeleteCourse.click(function () {
            const deleteForm = document.forms["delete-staff-form"];
            deleteForm.action = "/staffs/" + id + "?_method=DELETE";
            deleteForm.submit();
        });
    });

		// Dropzone.options.myDropzone = {
		// 	paramName: "file", maxFilesize: 10, method:
		// 		"post", acceptedFiles: "image/*", uploadMultiple: true,
		// };
});
