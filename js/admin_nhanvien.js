const staff_list = [
    {
        ID: 1,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 2,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 3,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 4,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 5,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 6,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 7,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 8,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
    {
        ID: 9,
        avatar: '',
        name: 'Selena Havoy',
        date: 'September 9, 2021',
        status: true,
    },
]

console.log('hello')

var app = document.querySelector('#table_content');

var items = staff_list.map(function (item) {
    return (
        `
        <tr>
            <td scope="row">${item.ID}</td>
            <td>
                <img src="./assets/images/avatar_staff.jpg" width="40" height="40" class="rounded-circle" />
            </td>
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>
                <button class="button status_off rounded-pilled">status</button>
            </td>
            <td>
                <a href="#"><i class="fa-solid fa-pen fa-2xl"></i></a>
            </td>
        </tr>
        `
    )
}).join('')

console.log(items)
app.innerHTML = items