const staff_list = 
[
    {
      "ID": 1,
      "avatar": "",
      "name": "Catalina Hudson",
      "status": true,
      "date": "31-10-2002"
    },
    {
      "ID": 2,
      "avatar": "",
      "name": "Franklin Hines",
      "status": true,
      "date": "16-06-1980"
    },
    {
      "ID": 3,
      "avatar": "",
      "name": "Glass Gordon",
      "status": false,
      "date": "04-11-1982"
    },
    {
      "ID": 4,
      "avatar": "",
      "name": "Osborne Wilson",
      "status": false,
      "date": "17-11-1986"
    },
    {
      "ID": 5,
      "avatar": "",
      "name": "Marilyn Adams",
      "status": true,
      "date": "27-03-2010"
    },
    {
      "ID": 6,
      "avatar": "",
      "name": "Marguerite Pierce",
      "status": false,
      "date": "29-03-1995"
    },
    {
      "ID": 7,
      "avatar": "",
      "name": "Harmon Chambers",
      "status": true,
      "date": "08-04-1986"
    },
    {
      "ID": 8,
      "avatar": "",
      "name": "Rosa Mueller",
      "status": false,
      "date": "12-08-1998"
    },
    {
      "ID": 9,
      "avatar": "",
      "name": "Logan Cox",
      "status": false,
      "date": "25-08-2005"
    },
    {
      "ID": 10,
      "avatar": "",
      "name": "Marie Buckner",
      "status": true,
      "date": "02-08-1975"
    }
  ]

// Create Table

var app = document.querySelector('#table_content');

function DisplayTable(list) {
  var items = list.map(function (item) {
    var status_css, status_content
    if (item.status){
        status_css = 'status_on';
        status_content = 'Active';
    }
    else {
        status_css = 'status_off';
        status_content = 'Offline';
    }
        
    return (
        `
        <tr>
            <td scope="row">${item.ID}</td>
            <td>
                <img src="./assets/images/avatar_staff.jpg" width="40" height="40" class="rounded-circle" />
            </td>
            <td class='column_name'>${item.name}</td>
            <td>${item.date}</td>
            <td>
                <button class="button ${status_css} rounded-pilled">${status_content}</button>
            </td>
            <td>
                <a href="#" data-toggle="modal" data-target="#settingStaff"><i class="fa-solid fa-pen fa-2xl"></i></a>
            </td>
        </tr>
        `
    )
}).join('')

app.innerHTML = items
}
DisplayTable(staff_list)
// ---------------------Adjust Filter--------------------------
// ------Dropdown-------
var placeholer = document.querySelector('.dropdown_placeholder');
var field_name = document.querySelectorAll('.filter_dropdown a');
for (let i=0; i< field_name.length; i++){
    field_name[i].addEventListener("click",() => {
        let name = field_name[i].innerHTML;
        placeholer.innerHTML = name;
    }) 
}

//Sort name
function compare_name( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

field_name[0].addEventListener("click",() => {
  let name = field_name[0].innerHTML;
  placeholer.innerHTML = name;
  staff_list.sort(compare_name)
  DisplayTable(staff_list)
}) 

//Sort ID

field_name[1].addEventListener("click",() => {
  let name = field_name[0].innerHTML;
  placeholer.innerHTML = name;
  staff_list.sort((a,b) => a.ID-b.ID)
  DisplayTable(staff_list)
}) 

//Sort Date
function compare_date( a, b ) {
  let dateA = a.date.split('-')
  console.log(dateA)
  let dateB = b.date.split('-')
  if (dateA[2] > dateB[2]){
    return 1;
  }
  else if (dateA[2] < dateB[2]){
    return -1;
  }
  else {
    if (dateA[1] > dateB[1]){
      return 1;
    }
    else if (dateA[1] < dateB[1]){
      return -1;
    }
    else {
      if (dateA[0] > dateB[0]){
        return 1;
      }
      else if (dateA[0] < dateB[0]){
        return -1;
      }
    }
  }
  return 0;
}

field_name[2].addEventListener("click",() => {
  let name = field_name[2].innerHTML;
  placeholer.innerHTML = name;
  staff_list.sort(compare_date)
  DisplayTable(staff_list)
}) 

//Sort Status
field_name[3].addEventListener("click",() => {
  let name = field_name[3].innerHTML;
  placeholer.innerHTML = name;
  staff_list.sort((a,b) => a.status < b.status ? 1 : -1 )
  DisplayTable(staff_list)
}) 


// ------Input-------
$("input.filter_input").on('change keydown paste input', (e) => {
  let text = e.target.value;
  if (text != ''){
    let SearchList = staff_list.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    })
    DisplayTable(SearchList)
  }
  else {
    DisplayTable(staff_list)
  }
});
