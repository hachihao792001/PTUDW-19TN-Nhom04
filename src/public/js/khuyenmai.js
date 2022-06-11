//Condition && Type

// var listConditionSelect = document.querySelector('.condition_group select');
// var listConditionInput = document.querySelector('.condition_group input');

// listConditionSelect.addEventListener('change', () => {
//   if (listConditionSelect.value == 'Không có') {
//     listConditionInput.setAttribute('placeholder', '');
//     listConditionInput.setAttribute('disabled', '');
//   } else {
//     listConditionInput.setAttribute('placeholder', 'VND');
//     listConditionInput.removeAttribute('disabled');
//   }
// });

// Process Data
let dateValue;
const formatDate = (listNode) => {
  for (let i = 0; i < listNode.length; i++) {
    dateValue = listNode[i].innerHTML;
    listNode[i].innerHTML = dateValue.substring(0, 8);
  }
};

formatDate(document.querySelectorAll('#list_staff .startDate'));
formatDate(document.querySelectorAll('#list_staff .endDate'));

let statusTable = document.querySelectorAll('#list_staff .statusTable');
let statusValue;
for (let i = 0; i < statusTable.length; i++) {
  statusValue = statusTable[i].innerHTML;
  statusTable[i].innerHTML = statusValue == 'true' ? 'Hoạt động' : 'Hết hạn';
}

let typeList = document.querySelectorAll('#list_staff .type');
let typeValue;
for (let i = 0; i < typeList.length; i++) {
  typeValue = typeList[i].innerHTML;
  typeList.innerHTML = typeValue.includes('%') ? 'Phần trăm' : 'Tiền';
}

// CRUD
const timeToInput = (time) => {
  let day = ('0' + time.getDate()).slice(-2);
  let month = ('0' + (time.getMonth() + 1)).slice(-2);
  let today = time.getFullYear() + '-' + month + '-' + day;
  return today;
};

window.addEventListener('DOMContentLoaded', function () {
  $('#settingDiscount').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const id = button.data('id');
    const startDate = button.data('startdate');
    const endDate = button.data('enddate');
    const status = button.data('status');
    const type = button.data('type');
    const condition = button.data('condition');

    const inputStartDate = $('#inputUpdateStartDate');
    const inputEndDate = $('#inputUpdateEndDate');
    const inputStatus = $('#inputUpdateStatus');
    const inputType = $('#inputUpdateType');
    const inputDropdownType = $('#dropdownType');
    const inputCondition = $('#inputUpdateCondition');
    const inputDropdownCondition = $('#dropdownCondition');

    //const inputUpdateStatus = $('#updateStaffForm input:radio[name=status]');

    inputStartDate.val(timeToInput(new Date(startDate)));
    inputEndDate.val(timeToInput(new Date(endDate)));

    if (status) {
      inputStatus.val('true');
    } else {
      inputStatus.val('false');
    }

    inputType.val(type);
    // if (type.includes('%')) {
    //   inputDropdownType.val('Phần trăm');
    // } else {
    //   inputDropdownType.val('Tiền');
    // }
    inputCondition.val(condition);
    // if (condition == 0) {
    //   inputDropdownCondition.val('Không có');
    // } else {
    //   inputDropdownCondition.val('Mua trên');
    // }

    const btnUpdate = $('#updateVoucher');
    btnUpdate.click(function () {
      const form = $('#updateVoucherForm');
      form.attr('action', `/vouchers/${id}?_method=PUT`);
      form.submit();
    });
  });

  $('#confirmDeleteModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const id = button.data('id');
    const btnDeleteCourse = $('#btn-delete-voucher');
    btnDeleteCourse.click(function () {
      const deleteForm = document.forms['delete-voucher-form'];
      deleteForm.action = '/vouchers/' + id + '?_method=DELETE';
      deleteForm.submit();
    });
  });

  // Dropzone.options.myDropzone = {
  // 	paramName: "file", maxFilesize: 10, method:
  // 		"post", acceptedFiles: "image/*", uploadMultiple: true,
  // };
});
