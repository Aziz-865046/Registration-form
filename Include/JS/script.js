// validation script here
// const inputs = document.querySelectorAll("input");
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
  // submitForm.addEventListener("submit", (e) => {
  //   e.preventDefault();
  const increment = document.getElementById("increment");
  let a = increment.value;
  const b = a + 1;
  increment.value = b;
  const Fd = new FormData(submitForm);

  const obj = Object.fromEntries(Fd);
  const json = JSON.stringify(obj);
  localStorage.setItem(`form${b}`, json);

  //////////////////////////////////////////////////////
  const getjson = localStorage.getItem(`form`);
  const getobj = JSON.parse(getjson);
  console.log(getobj);
  console.log(getobj.name + " : name   ");

  // for (key in obj) {
  //   const markup = `<div>
  //           <span>${key}:${obj[key]} </span></div>`;
  //   document.getElementById("data").innerHTML += markup;
  // }
  //////////////////////////////////////////////////////
  // window.location.href = "./Include/confirm.html";
  // });
}

const patterns = {
  name: /[a-zA-Z\sa-zA-Z]{4,20}/,
  username: /^[a-zA-Z-\d]{5,12}$/,
  // email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  email:
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
  phone: /^\d{10}$/,
  password: /^[\w@-]{8,20}$/,
  cnfrpassword: /^[\w@-]{8,20}$/,
  // gender: /[male]?[female]?[other]?/,
};
function validate(field, regex) {
  // field.nextElementSibling.style.opacity = "1";
  if (regex.test(field.value)) {
    field.className = "valid";
    // field.style.opacity = "1";

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
  // console.log(gender);

  // Create a new row and cells
  let table = document.getElementById("table");
  let newRow = table.insertRow();

  let nameCell = newRow.insertCell(0);
  let usernameCell = newRow.insertCell(1);
  let emailCell = newRow.insertCell(2);
  let phoneCell = newRow.insertCell(3);
  let genderCell = newRow.insertCell(4);
  // Add data to session storage
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("username", userName);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("gender", gender);
  // Add values to the cells
  nameCell.textContent = name;
  usernameCell.textContent = userName;
  emailCell.textContent = email;
  phoneCell.textContent = phone;
  genderCell.textContent = gender;
}
// showbtn.addEventListener("click", () => {
//   console.log("click button");
//   let textElement = document.getElementById("textElement");
//   if (showbtn.innerText === "Show Data") {
//     textElement.innerText = "Hide Data";
//     showData.style.display = "block";
//     regForm.style.display = "none";
//   } else {
//     showData.style.display = "none";
//     regForm.style.display = "block";
//     textElement.innerText = "Show Data";
//   }
// });
////////////////////////////////////////////////////////////////
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("click submit btn");
  genderCheck();
  saveData();
  if (validInputs()) {
    // registration();
    console.log("hello");
    submitForm.submit();
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
// isFormValid(email);
function testpattern(e, value) {
  const reg = patterns[e];
  // console.log(reg);
  return reg.test(value);
}

function validInputs() {
  let allValid = true;
  // registration();

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
    //   submitForm.submit();
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
// function sttorage() {
//   const arr = [];
//   const arr2 = [];
//   for (let input of inputs) {
//     arr.push(input.value);
//     arr2.push(input.id);
//   }
//   arr2.push("gen");
//   console.log(arr2);
//   for (let i = 0; i < arr.length + 1; i++) {
//     localStorage.setItem(arr2[i], arr[i]);

//     console.log(arr2[i] + " : " + arr[i]);
//   }
//   arr.push(submitForm.elements["gender"].value);
//   console.log(arr2);
//   console.log(arr);
//   console.log(arr[0]);
//   console.log(arr[1]);
//   console.log(arr[2]);
//   console.log(arr[3]);
//   console.log(arr[3]);
//   console.log(arr[9]);
// }
