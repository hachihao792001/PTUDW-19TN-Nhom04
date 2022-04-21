window.addEventListener("load", function() {
    $(document).ready(function() {
        // const orderTitle = [{
        //         name: "ID đơn hàng",
        //         id: "order_id",
        //     },
        //     {
        //         name: "ID khách hàng",
        //         id: "customer_id",
        //     },
        //     {
        //         name: "Thanh toán",
        //         id: "payment_method",
        //     },
        //     {
        //         name: "Tổng tiền",
        //         id: "total",
        //     },
        //     {
        //         name: "Ngày mua",
        //         id: "date",
        //     },
        //     {
        //         name: "Trạng thái",
        //         id: "status",
        //     },
        //     {
        //         name: "Thao tác",
        //         id: "action",
        //     },
        // ];

        const orderItems = [{
                order_id: 1,
                customer_id: 1,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Chờ xác nhận",
                action: "",
            },
            {
                order_id: 2,
                customer_id: 2,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Hoàn tất",
                action: "",
            },
            {
                order_id: 3,
                customer_id: 3,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Đã xác nhận",
                action: "",
            }, {
                order_id: 4,
                customer_id: 4,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Chờ xác nhận",
                action: "",
            }, {
                order_id: 5,
                customer_id: 5,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Đang giao",
                action: "",
            }, {
                order_id: 6,
                customer_id: 6,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Đang xử lý",
                action: "",
            }, {
                order_id: 7,
                customer_id: 7,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Đã hủy",
                action: "",
            }, {
                order_id: 8,
                customer_id: 8,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Chờ xác nhận",
                action: "",
            }, {
                order_id: 9,
                customer_id: 9,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "Trả hàng",
                action: "",
            },
        ];

        // orderTitle.forEach((order) => {
        //     orderMap[order.id] = order.name;
        // });

        $(".order-table tbody").append(
            orderItems.map(function(order) {
                return `<tr>
                        <th scope="row">${order.order_id}</th>
                        <td>${order.customer_id}</td>
                        <td>${order.payment_method}</td>
                        <td>${order.total}</td>                    
                        <td>${order.date}</td>
                        <td>${order.status}</td>
                        <td><i class="fa fa-edit"></i></td>
                    </tr>`;
            }));
    });
});