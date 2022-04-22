const product_list = [
    {
        ID: 1,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        stock: 5,
        price: 39000,
        description: "Iced PHIN Coffee with Almond Milk",
    },
    {
        ID: 2,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        stock: 5,
        price: 39000,
        description: "Iced PHIN Coffee with Almond Milk",
    },
    {
        ID: 3,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        stock: 5,
        price: 39000,
        description: "Iced PHIN Coffee with Almond Milk",
    },
    {
        ID: 4,
        image: "./assets/images/example_logo.jpeg",
        name: "PhinDi Hạnh Nhân",
        stock: 5,
        price: 39000,
        description: "Iced PHIN Coffee with Almond Milk",
    },
];

console.log("hello");

var app = document.querySelector("#table_content");

var items = product_list
    .map(function (item) {
        return `
        <tr>
            <td scope="row">${item.ID}</td>
            <td>
                <img src="${item.image}" width="40" height="40" class="rounded-circle" />
            </td>
            <td>${item.name}</td>
            <td>${item.stock}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td>
                <a href="#" type="button" data-toggle="modal" data-target="#exampleModalLong">
                    <i class="fa-solid fa-pen fa-2xl"></i>
                </a>
            </td>
        </tr>
        `;
    })
    .join("");

console.log(items);
app.innerHTML = items;
