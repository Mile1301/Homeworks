const newH3 = document.createElement("h3");
const form = document.querySelector("form");
const fieldsetE3 = document.querySelector("#e3");
const fieldsetH1 = document.querySelector("#h1");
const fieldsetH2 = document.querySelector("#h2");
const fieldsetH3 = document.querySelector("#h3");
// STUDENT EXCERCISE #3
let birthYear = 0;
let currentYear = 0;
function inputYears() {
  birthYear = Number(prompt("Please enter your birth year:"));
  currentYear = Number(prompt("Please enter the current year:"));
}
function calculateAge(birthYear, currentYear) {
  if (
    Number.isNaN(birthYear) ||
    (typeof birthYear !== "number" && Number.isNaN(currentYear)) ||
    typeof currentYear !== "number"
  ) {
    return "Please enter the years in valid format YYYY using only numbers";
  } else {
    let result = currentYear - birthYear;
    return `You are ${result} years old`;
  }
}
console.log(
  "*********************************************************************"
);
console.log(Number(Date().slice(11, 15)));
console.log(
  "This is how i can get the current year in JavaScript if you meant this"
);
console.log(
  "*********************************************************************"
);

const buttonExcerciseEmpty = document
  .querySelector("#excercise-empty")
  .addEventListener("click", function () {
    newH3.innerText = `${calculateAge()}`;
    fieldsetE3.appendChild(newH3);
  });
const buttonExcercisePredefined = document
  .querySelector("#excercise-predefined")
  .addEventListener("click", function () {
    newH3.innerText = `${calculateAge(1995, 2022)}`;
    fieldsetE3.appendChild(newH3);
  });
const buttonExcerciseInput = document
  .querySelector("#excercise-input")
  .addEventListener("click", function () {
    inputYears();
    newH3.innerText = `${calculateAge(birthYear, currentYear)}`;
    fieldsetE3.appendChild(newH3);
  });

/////////////////////////////////////////////////////////////////////////
// HOMEWORK PART 1
let u;
let n = null;
let b = 1 < 2;
function paramType(paramInput) {
  let printedParamType = typeof paramInput;
  let stringPrintedParamType = String(printedParamType).toUpperCase();
  return `${paramInput} is a ${stringPrintedParamType} primitive data type`;
}
const buttonStr = document
  .querySelector("#str")
  .addEventListener("click", function () {
    newH3.innerText = `${paramType("Hello")}`;
    fieldsetH1.appendChild(newH3);
  });
const buttonNum = document
  .querySelector("#num")
  .addEventListener("click", function () {
    newH3.innerText = `${paramType(1)}`;
    fieldsetH1.appendChild(newH3);
  });
const buttonUnd = document
  .querySelector("#und")
  .addEventListener("click", function () {
    newH3.innerText = `${paramType(u)}`;
    fieldsetH1.appendChild(newH3);
  });
const buttonNull = document
  .querySelector("#null")
  .addEventListener("click", function () {
    newH3.innerText = `${paramType(n)}`;
    fieldsetH1.appendChild(newH3);
  });
const buttonBoo = document
  .querySelector("#boo")
  .addEventListener("click", function () {
    newH3.innerText = `${paramType(b)}`;
    fieldsetH1.appendChild(newH3);
  });

/////////////////////////////////////////////////////////////////////////
// HOMEWORK PART 2
let dogAgeInput = 0;
let humanAgeInput = 0;
let dogAgeResult = 0;
let humanAgeResult = 0;
const dogToHumanConversion = 7;
const humanToDogConversion = 1 / 7;
function toggleHumanDogAge(humanAgeInput, dogAgeInput) {
  let enterDogOrHuman = prompt(
    "Press D to calculate dog`s age based on human years or press H to convert dog to human years"
  );
  if (enterDogOrHuman.toLowerCase() === "d") {
    dogAgeInput = Number(
      prompt("Enter your dogs` years to convert it to human years")
    );
    if (Number.isNaN(dogAgeInput) && dogAgeInput !== "number") {
      dogAgeInput = Number(
        prompt(
          "Invalid enter. Please re-enter your dogs` years as a number to convert it to human years"
        )
      );
    }
    dogAgeResult = dogAgeInput * dogToHumanConversion;
    return dogAgeResult;
  } else if (enterDogOrHuman.toLowerCase() === "h") {
    humanAgeInput = Number(
      prompt("Enter human years to convert it to dog years")
    );
    if (Number.isNaN(humanAgeInput) && humanAgeInput !== "number") {
      humanAgeInput = Number(
        prompt(
          "Invalid enter. Please re-enter human years as a number to convert it to dog years"
        )
      );
    }
    humanAgeResult = humanAgeInput * humanToDogConversion;
    return humanAgeResult;
  } else {
    enterDogOrHuman = prompt(
      "PLEASEEEE press D to calculate dog`s age based on human years or press H to convert dog to human years"
    );
    toggleHumanDogAge();
  }
}
const h2Button = document
  .querySelector("#h2Button")
  .addEventListener("click", function () {
    newH3.innerText = `${toggleHumanDogAge()}`;
    fieldsetH2.appendChild(newH3);
  });
/////////////////////////////////////////////////////////////////////////
// HOMEWORK PART 3

let currentBalance = 1000;
let withdrawAmmount = "";
let newBalance = 0;

function atm(withdrawAmmount) {
  withdrawAmmount = Number(
    prompt("Enter the ammount you want to withdraw from your account")
  );
  if (currentBalance > withdrawAmmount) {
    newBalance = currentBalance - withdrawAmmount;
    return `${withdrawAmmount}$ are withdrawn with this transaction
    Your new balance is ${newBalance}`;
  } else if (currentBalance < withdrawAmmount) {
    return `Not enough money. Your current balance is ${currentBalance}`;
  }
}
const h3Button = document
  .querySelector("#h3Button")
  .addEventListener("click", function () {
    newH3.innerText = `${atm()}$`;
    fieldsetH3.appendChild(newH3);
  });
