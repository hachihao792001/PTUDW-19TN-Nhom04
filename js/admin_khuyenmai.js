var KM_list =
[
    {
      "ID": 0,
      "code": "NHG69",
      "remain": "8/20",
      "startDate": "05-01-1992",
      "endDate": "26-02-2010",
      "status": "Hết hạn",
      "type": "Money"
    },
    {
      "ID": 1,
      "code": "TFN65",
      "remain": "20/20",
      "startDate": "29-08-2020",
      "endDate": "17-10-2017",
      "status": "Hoạt động",
      "type": "Money"
    },
    {
      "ID": 2,
      "code": "NHG31",
      "remain": "18/20",
      "startDate": "12-08-1973",
      "endDate": "05-11-2003",
      "status": "Hoạt động",
      "type": "Amount"
    },
    {
      "ID": 3,
      "code": "NHG21",
      "remain": "1/20",
      "startDate": "31-03-1982",
      "endDate": "26-06-1983",
      "status": "Hoạt động",
      "type": "Money"
    },
    {
      "ID": 4,
      "code": "NHG55",
      "remain": "9/20",
      "startDate": "11-07-1992",
      "endDate": "05-09-1998",
      "status": "Hết hạn",
      "type": "Amount"
    },
    {
      "ID": 5,
      "code": "BKN60",
      "remain": "11/20",
      "startDate": "01-09-1991",
      "endDate": "05-06-2021",
      "status": "Hết hạn",
      "type": "Money"
    },
    {
      "ID": 6,
      "code": "NHG31",
      "remain": "11/20",
      "startDate": "14-06-1993",
      "endDate": "20-03-1996",
      "status": "Hết hạn",
      "type": "Money"
    },
    {
      "ID": 7,
      "code": "NHG50",
      "remain": "2/20",
      "startDate": "23-06-1974",
      "endDate": "08-05-1992",
      "status": "Hết hạn",
      "type": "Amount"
    },
    {
      "ID": 8,
      "code": "TFN24",
      "remain": "1/20",
      "startDate": "02-07-2009",
      "endDate": "10-12-2005",
      "status": "Hoạt động",
      "type": "Money"
    },
    {
      "ID": 9,
      "code": "TFN70",
      "remain": "12/20",
      "startDate": "01-01-1978",
      "endDate": "11-06-1990",
      "status": "Hoạt động",
      "type": "Amount"
    },
    {
      "ID": 10,
      "code": "BKN91",
      "remain": "7/20",
      "startDate": "28-07-1989",
      "endDate": "09-04-1997",
      "status": "Hết hạn",
      "type": "Money"
    }
  ]

// Create Table

var app = document.querySelector('#table_content');

var items = KM_list.map(function (item) {   
    return (
        `
        <tr>
            <td scope="row">${item.ID}</td>
            <td>${item.code}</td>
            <td>${item.remain}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${item.status}</td>
            <td>${item.type}</td>
            <td>
                <a href="#"><i class="fa-solid fa-circle-info fa-2xl"></i></a>
            </td>
        </tr>
        `
    )
}).join('')

app.innerHTML = items

// Adjust filter
// Dropdown
var placeholer = document.querySelector('.dropdown_placeholder');
var field_name = document.querySelectorAll('.filter_dropdown a');
for (let i=0; i< field_name.length; i++){
    field_name[i].addEventListener("click",() => {
        let name = field_name[i].innerHTML;
        placeholer.innerHTML = name;
    }) 
}

