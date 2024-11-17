// validation script here
const inputs = document.querySelectorAll("input");
const password = document.getElementById("password");
const cnfrmpassword = document.getElementById("cnfrpassword");
const btn = document.getAnimations("btn");
const form = document.forms[theform];
let showData = document.getElementById("show-data");
let regForm = document.getElementById("regForm");
let switchBtn = document.getElementById("showbtn");
let submitForm = document.getElementById("form-data");

const patterns = {
  name: /[a-zA-Z\sa-zA-Z]{4,20}/,
  username: /^[a-zA-Z-\d]{5,12}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phone: /^\d{10}$/,
  password: /^[\w@-]{8,20}$/,
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

  let form = document.getElementById("form-data");
  let gender = form.elements["gender"].value;

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
  validateInputs();
  registration();
});
function validateInputs() {
  let allValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      allValid = false;
    } else if (!input.checkValidity()) {
      allValid = false;
    } else {
    }
  });
  if (allValid) {
    submitForm.submit();
  }
}
