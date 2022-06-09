window.addEventListener("load", function () {
    $(document).ready(function () {
        const orderItems = [
            {
                order_id: 1,
                customer_id: 1,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "DELIVERED",
                action: "",
            },
            {
                order_id: 2,
                customer_id: 2,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "CONFIRMED",
                action: "",
            },
            {
                order_id: 3,
                customer_id: 3,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "NEW",
                action: "",
            },
            {
                order_id: 4,
                customer_id: 4,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "DELIVERING",
                action: "",
            },
            {
                order_id: 5,
                customer_id: 5,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "CONFIRMED",
                action: "",
            },
            {
                order_id: 6,
                customer_id: 6,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "DELIVERING",
                action: "",
            },
            {
                order_id: 7,
                customer_id: 7,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "NEW",
                action: "",
            },
            {
                order_id: 8,
                customer_id: 8,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "CONFIRMED",
                action: "",
            },
            {
                order_id: 9,
                customer_id: 9,
                payment_method: "Tiền mặt",
                total: "49.000",
                date: "19/4/2022",
                status: "NEW",
                action: "",
            },
        ];

        const orderStatus = [
            { code: "NEW", className: "new", title: "Mới" },
            { code: "CONFIRMED", className: "confirmed", title: "Đã xác nhận" },
            { code: "DELIVERING", className: "delivering", title: "Đang giao" },
            { code: "DELIVERED", className: "delivered", title: "Đã giao" },
        ];
        const mapStatus = function (cod) {
            return orderStatus.find((o) => o.code === cod);
        };
        // const mapStatus = function(cod) { orderStatus => orderStatus.code == 'NEW' };

        // <button class="
        // ${mapStatus(order.status).className}">${mapStatus(order.status).title}
        // <button>

        $(".order-table tbody").append(
            orderItems.map(function (order) {
                return `<tr>
                        <td>${order.order_id}</th>
                        <td>${order.customer_id}</td>
                        <td>${order.payment_method}</td>
                        <td>${order.total}</td>                    
                        <td>${order.date}</td>
                        <td>
                        <button class="status ${
                            mapStatus(order.status).className
                        }">${mapStatus(order.status).title}</button>
                        </td>
                        <td>
                            <a href="#" type="button" data-toggle="modal" data-target="#editDonHangModal">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                        </td>
                    </tr>`;
            })
        );
    });
});
