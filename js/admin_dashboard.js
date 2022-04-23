const product_consumation_list = [
    {
        ID: 1,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        sold: 100,
    },
    {
        ID: 2,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        sold: 100,
    },
    {
        ID: 3,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        sold: 100,
    },
];

console.log("hello");

var app = document.querySelector("#consume_table > tbody");

var items = product_consumation_list
    .map(function (item) {
        return `
        <tr>
            <td scope="row">${item.ID}</td>
            <td>
                <img src="${item.image}" width="40" height="40" class="rounded-circle" />
            </td>
            <td>${item.name}</td>
            <td>${item.sold}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 20%"
                        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20%</div>
                </div>
            </td>
        </tr>
        `;
    })
    .join("");

console.log(items);
app.innerHTML = items;
