// validation script here
const inputs = document
  .getElementById("info-section")
  .querySelectorAll("input");
const password = document.getElementById("password");
const cnfrmpassword = document.getElementById("cnfrpassword");
const btn = document.getAnimations("btn");
const form = document.forms[theform];
let showData = document.getElementById("show-data");
let regForm = document.getElementById("regForm");
let switchBtn = document.getElementById("showbtn");
let submitForm = document.getElementById("form-data");

let fname = document.getElementById("name");
let userName = document.getElementById("username");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let genderItem = document.getElementsByClassName("genderitem");
let gender = submitForm.elements["gender"];

function saveData() {
  let fname = document.getElementById("name").value;
  let userName = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let gender = submitForm.elements["gender"].value;

  let userData = {
    name: fname,
    user: userName,
    mail: email,
    mobile: phone,
    gender: gender,
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);

  displayUserData();
}
displayUserData();
function displayUserData() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let tableBody = document.querySelector("#table tbody");
  let table = document.querySelector("#table ");
  // console.log(tableBody);
  tableBody.innerHTML = "";

  if (users.length > 0) {
    showData.style.display = "block";
  }

  users.forEach(function (user) {
    let row = document.createElement("tr");
    // console.log(table);
    let delCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let userCell = document.createElement("td");
    let mailCell = document.createElement("td");
    let phoneCell = document.createElement("td");
    let genderCell = document.createElement("td");

    // console.log(user.name);
    delCell.innerHTML = `<input type="checkbox" class="check">`;
    nameCell.textContent = user.name;
    userCell.textContent = user.user;
    mailCell.textContent = user.mail;
    phoneCell.textContent = user.mobile;
    genderCell.textContent = user.gender;
    // console.log(nameCell);

    row.appendChild(delCell);
    row.appendChild(nameCell);
    row.appendChild(userCell);
    row.appendChild(mailCell);
    row.appendChild(phoneCell);
    row.appendChild(genderCell);
    // console.log(table);
    tableBody.appendChild(row);
  });
}
const patterns = {
  name: /[a-zA-Z\sa-zA-Z]{4,20}/,
  username: /^[a-zA-Z-\d]{5,12}$/,
  email:
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
  phone: /^\d{10}$/,
  password: /^[\w@-]{8,20}$/,
  cnfrpassword: /^[\w@-]{8,20}$/,
};
function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = "valid";
    return true;
  } else {
    field.className = "invalid";
    return false;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const regExKey = e.target.dataset.regex;
    const regex = patterns[regExKey];
    if (regex) {
      validate(e.target, regex);
    }
  });
});

function check(elem) {
  if (elem.value.length > 0) {
    if (elem.value != password.value) {
      cnfrmpassword.className = "invalid";
    } else {
      cnfrmpassword.className = "valid";
    }
  }
}

function registration() {
  showData.style.display = "block";

  let name = document.getElementById("name").value;
  let userName = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let gender = submitForm.elements["gender"].value;

  // Create a new row and cells
  let table = document.getElementById("table");
  let newRow = table.insertRow();

  let nameCell = newRow.insertCell(0);
  let usernameCell = newRow.insertCell(1);
  let emailCell = newRow.insertCell(2);
  let phoneCell = newRow.insertCell(3);
  let genderCell = newRow.insertCell(4);

  // Add values to the cells
  nameCell.textContent = name;
  usernameCell.textContent = userName;
  emailCell.textContent = email;
  phoneCell.textContent = phone;
  genderCell.textContent = gender;
}

submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("click submit btn");
  genderCheck();
  saveData();
  if (validInputs()) {
    // registration();
    console.log("hello");
    // submitForm.submit();
  } else {
    console.log("------------------error-----------------");
  }
});
//
function checkValidity() {
  if (patterns.name.test(fname.value)) {
    return (allValid = false);
  }
}
function testpattern(e, value) {
  const reg = patterns[e];
  return reg.test(value);
}

function validInputs() {
  let allValid = true;

  inputs.forEach((input) => {
    console.log("data : " + input.dataset.regex);

    console.log(testpattern(input.dataset.regex, input.value));
    if (input.value.trim() == "") {
      allValid = false;

      console.log("error");
      return false;
    } else if (testpattern(input.dataset.regex, input.value)) {
      allValid = true;
      console.log("sucess");
      return true;
    } else {
      console.log(input.value);
      allValid = false;
      console.log("return errors");
      return false;
    }
  });
  if (allValid) {
    console.log("sumbim form");
    return true;
  }
}
function genderCheck() {
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const other = document.getElementById("prfnot");
  const error = document.getElementById("genderError");
  if (!male.checked && !female.checked && !other.checked) {
    error.style.opacity = "1";
  } else if (male.checked || female.checked || other.checked) {
    error.style.opacity = "0";
  }
}
function searchData() {
  const filderInput = document.getElementById("search").value;
  const filters = filderInput.toUpperCase();
  const table = document.getElementById("table");
  const tr = table.getElementsByTagName("tr");
  console.log(table);
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    // console.log(td);
    if (td) {
      const txtValue = td.textContent;
      console.log(txtValue.indexOf(filters));
      if (txtValue.toUpperCase().indexOf(filters) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
const filterBtn = document.getElementById("searchbtn");
const deleteBtn = document.getElementById("delete-data");

filterBtn.addEventListener("click", () => {
  searchData();
});

function allCheck() {
  const check = document.getElementById("allCheck");
  const checkItem = table.getElementsByClassName("check");
  for (let i = 0; i < checkItem.length; i++) {
    if (check.checked) {
      console.log("check");
      console.log(checkItem[i]);
      checkItem[i].checked;
    } else {
      console.log("unselect");
    }
  }
}
deleteBtn.addEventListener("click", () => {
  allCheck();
  // const tbody = document.getElementById("tbody");
  // tr = tbody.getElementsByTagName("tr");
  // console.log(tr);
  const checkBox = table.getElementsByClassName("check");
  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked) {
      console.log(checkBox[i]);
      table.deleteRow(i + 1);
    }

    // tr[i].appendChild(td);
  }
  // for
});

// function filterItems(arr, query) {
//   console.log(arr);
//   return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
// }
// console.log(filterItems(names, "jc"));
// console.log(filterItems(searchData, "az"));
// console.log(searchData);
// console.log(searchInput);
// }
// $("#search").on("keyup", function () {
//   var value = $(this).val().toLowerCase();
//   $("#table tr").filter(function () {
//     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
//   });
// });
