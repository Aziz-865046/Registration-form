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
let gender = submitForm.elements["gender"].value;

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
    let editCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let userCell = document.createElement("td");
    let mailCell = document.createElement("td");
    let phoneCell = document.createElement("td");
    let genderCell = document.createElement("td");

    // console.log(user.name);
    delCell.innerHTML = `<input type="checkbox" class="rowCheckbox">`;
    nameCell.textContent = user.name;
    userCell.textContent = user.user;
    mailCell.textContent = user.mail;
    phoneCell.textContent = user.mobile;
    genderCell.textContent = user.gender;
    // editCell.innerHTML = `<button class="edit" onclick=editBtnClick(this)>📝</button>`;
    editCell.innerHTML = `<button class="edit">📝</button>`;
    // console.log(nameCell);

    row.appendChild(delCell);
    row.appendChild(nameCell);
    row.appendChild(userCell);
    row.appendChild(mailCell);
    row.appendChild(phoneCell);
    row.appendChild(genderCell);
    row.appendChild(editCell);
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
  // console.log("click submit btn");
  genderCheck();
  if (validInputs()) {
    updateDataOnLocalStorage();
    // registration();
    // saveData();
    // updateData();
    // console.log("hello");
    submitForm.reset();
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
    // console.log("data : " + input.dataset.regex);

    // console.log(testpattern(input.dataset.regex, input.value));
    if (input.value.trim() == "") {
      allValid = false;

      // console.log("error");
      return false;
    } else if (testpattern(input.dataset.regex, input.value)) {
      allValid = true;
      // console.log("sucess");
      return true;
    } else {
      console.log(input.value);
      allValid = false;
      // console.log("return errors");
      return false;
    }
  });
  if (allValid) {
    // console.log("sumbim form");
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

const allCheckBtn = document.getElementById("allCheck");
allCheckBtn.addEventListener("change", () => {
  allCheck();
});
function allCheck() {
  const checkItem = table.querySelectorAll(".rowCheckbox");
  for (let i = 0; i < checkItem.length; i++) {
    if (allCheckBtn.checked) {
      checkItem[i].checked = true;
    }
    if (!allCheckBtn.checked) {
      checkItem[i].checked = false;
    }
  }
  console.log(checkItem);
}
function removeCheckedRows() {
  const checkboxes = document.querySelectorAll(".rowCheckbox");
  let users = JSON.parse(localStorage.getItem("users"));

  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      let indexToRemove = users.findIndex(
        (user) => user.name === users[i].name
      );
      if (indexToRemove > -1) {
        users.splice(indexToRemove, 1);
      }

      localStorage.setItem("users", JSON.stringify(users));
      console.log("user");
      console.log(users);
      displayUserData();
    }
  });
}
deleteBtn.addEventListener("click", () => {
  console.log("delete cell");
  removeCheckedRows();
});

const editBtn = document.querySelectorAll(".edit");

editBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    // console.log(btn);
    editBtnClick(btn, i);
    console.log(i);
  });
});

function updateDataOnLocalStorage(ind) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[ind];
  console.log("upadata data");
  console.log(users[ind]);

  let fname = document.getElementById("name").value;
  let userName = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let genders = submitForm.elements["gender"].value;
  console.log(fname, userName, email, phone, genders);
  newUser = {
    name: fname,
    user: userName,
    mail: email,
    mobile: phone,
    gender: genders,
  };
  console.log("newUser");
  console.log(newUser);

  if ((newUser = users[ind])) {
    console.log("same");
  }

  /////////
  // let existing = localStorage.getItem("myObject");
  // let obj = users[ind] ? JSON.parse(users[ind]) : {};
  // console.log(obj);
  // obj.newKey = "newValue";
  // localStorage.setItem("myObject", JSON.stringify(obj));
}
function updateData() {
  console.log("Update Data");
  let users = JSON.parse(localStorage.getItem("users"));

  if (!localStorage.length == 0) {
    console.log("local");
    users.forEach((user) => {
      let allValid = false;
      console.log(allValid);
      console.log(user);
      if (true) {
        if (user.name === fname.value) {
          console.log("same name");
          // allValid = false;
          return true;
        }
        if (user.user === userName.value) {
          console.log("same username");
          // allValid = false;
          return true;
        }
        if (user.mail === email.value) {
          console.log("same email");
          // allValid = false;
          return true;
        }
        if (user.mobile === phone.value) {
          console.log("same phone");
          // allValid = false;
          return true;
        }
        if (user.gender === submitForm.elements["gender"].value) {
          console.log("same gender");
          // allValid = false;
          return true;
        }
        return (allValid = true);
      }
      console.log(allValid);
      if (allValid) {
        console.log(allValid);
        console.log("all filed same");
      } else {
        console.log("not same");
      }
    });

    // console.log(allValid);
  }
  console.log(users);

  // if (checkbox.checked) {
  //   let indexToRemove = users.findIndex(
  //     (user) => user.name === users[i].name
  //   );
  //   if (indexToRemove > -1) {
  //     users.splice(indexToRemove, 1);
  //   }

  //   localStorage.setItem("users", JSON.stringify(users));
  //   console.log("user");
  //   console.log(users);
  //   displayUserData();
  // }
}

function editBtnClick(button, ind) {
  let users = JSON.parse(localStorage.getItem("users"));

  updateDataOnLocalStorage(ind);

  console.log(users[ind]);
  const userFname = users[ind].name;
  const userUsername = users[ind].user;
  const userEmail = users[ind].mail;
  const userPhone = users[ind].mobile;
  const userGender = users[ind].gender;

  // const userPass = users[ind].password;
  // const conPass = users[ind].cnfrpassword;

  console.log(userFname, userUsername, userEmail, userPhone, userGender);

  // console.log(tablefName, tableUsername, tableEmail, tablePhone, tableGender);

  fname.value = userFname;
  userName.value = userUsername;
  email.value = userEmail;
  phone.value = userPhone;
  gender = userGender;
  console.log(gender);
  console.log(userGender);
}
// function saveEdit() {
//   // Get the data from the form
//   const name = document.getElementById("name").value;
//   const age = document.getElementById("age").value;

//   // Update the table row with the new data
//   currentRow.cells[0].innerText = name;
//   currentRow.cells[1].innerText = age;

//   // Hide the form
//   document.getElementById("editForm").style.display = "none";
// }
// Retrieve the user data from local storage

//////////////////////////////////////////////////////////////////
// let users = JSON.parse(localStorage.getItem("users"));

// // Check if the users array exists
// if (users) {
//   // Index of the user you want to delete (assuming 'mushrat' is at index 2)
//   let indexToRemove = users.findIndex((user) => user.user === "musharat123");

//   // Remove the user from the array
//   if (indexToRemove > -1) {
//     users.splice(indexToRemove, 1);
//   }

//   // Update the local storage with the modified array
//   localStorage.setItem("users", JSON.stringify(users));
// }

// console.log(users);
