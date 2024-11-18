// validation script here
const inputs = document.querySelectorAll("input");
// const inputs = document.getElementById("form-data").querySelectorAll("input");

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
const patterns = {
  name: /[a-zA-Z\sa-zA-Z]{4,20}/,
  username: /^[a-zA-Z-\d]{5,12}$/,
  // email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
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
  console.log(gender);

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
  // sessionStorage.setItem("a", "b");
  // Add values to the cells
  nameCell.textContent = name;
  usernameCell.textContent = userName;
  emailCell.textContent = email;
  phoneCell.textContent = phone;
  genderCell.textContent = gender;
}
showbtn.addEventListener("click", () => {
  console.log("click button");
  let textElement = document.getElementById("textElement");
  if (showbtn.innerText === "Show Data") {
    textElement.innerText = "Hide Data";
    showData.style.display = "block";
    regForm.style.display = "none";
  } else {
    showData.style.display = "none";
    regForm.style.display = "block";
    textElement.innerText = "Show Data";
  }
});
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("submit");
  // if (validateInputs()) {
  // genderCheck();
  if (validInputs()) {
    registration();
    console.log("hello");
    // submitForm.submit();
  }
});
// function validateInputs() {
//   let allValid = true;
//   // registration();
//   let gender = submitForm.elements["gender"].value;
//   inputs.forEach((input) => {
//     if (!input.value.trim() || !gender) {
//       allValid = false;
//     } else if (checkValidity()) {
//       console.log(!input.checkValidity());
//     } else {
//     }
//   });
//   console.log(allValid);
//   if (allValid) {
//     //   submitForm.submit();
//     return true;
//   }
// }

function checkValidity() {
  if (patterns.name.test(fname.value)) {
    return (allValid = false);
  }
}
// isFormValid(email);
function isFormValid(e) {
  console.log(e);

  const reg = patterns[e];
  console.log(reg);

  return reg.test(e);
}
function validInputs() {
  let allValid = true;

  console.log("submit");
  inputs.forEach((input) => {
    // console.log(input);
    if (input.value.trim() == "") {
      // console.log(input.value);
      allValid = false;

      console.log("error");
    } else if (isFormValid(input.id)) {
      allValid = true;
      console.log(input.value);
      console.log("sucess");
    } else {
      console.log(input.value);
      allValid = false;
      console.log("return errors");
    }
  });
}
// console.log(document.getElementById("form-data").querySelectorAll("input"));
function genderCheck() {
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const other = document.getElementById("prfnot");
  const error = document.getElementById("genderError");
  if (!male.checked && !female.checked && !other.checked) {
    console.log("error");
    error.style.opacity = "1";
  } else if (male.checked || female.checked || other.checked) {
    error.style.opacity = "0";
    console.log("one select");
  } else {
    alert("Valid Input :-)");
  }
}
