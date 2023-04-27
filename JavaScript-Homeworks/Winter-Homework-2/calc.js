const calc = document.querySelector(".calc");
const calcScreen = document.querySelector(".screen");
const nums = document.querySelectorAll(".num");
const equals = document.querySelector(".equals");
const reset = document.querySelector(".reset");
const backspace = document.querySelector(".backspace");
const sum = document.querySelector("#sum");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const decimal = document.querySelector(".decimal");

function removeDisabled() {
  sum.removeAttribute("disabled", "");
  subtract.removeAttribute("disabled", "");
  multiply.removeAttribute("disabled", "");
  divide.removeAttribute("disabled", "");
  equals.removeAttribute("disabled", "");
  reset.removeAttribute("disabled", "");
  for (let num of nums) {
    num.removeAttribute("disabled", "");
  }
}
function resetting() {
  calcScreen.classList.remove("screen-sm");
  attempts = 0;
  calcScreen.textContent = 0;
  addResult = 0;
  input = "sum";
  inputNum = 0;
  concatedStr = [];
  result = [];
  hasResult = false;
  sum.setAttribute("disabled", "");
  subtract.setAttribute("disabled", "");
  multiply.setAttribute("disabled", "");
  divide.setAttribute("disabled", "");
  console.clear();
  decimal.removeAttribute("disabled", "");
  for (let num of nums) {
    num.removeAttribute("disabled", "");
  }
}

let attempts = 0;
const maxClicks = 1;
calcScreen.textContent = 0;
let input = "sum";
let inputNum = 0;
let concatedStr = [];
let result = [];
let hasResult = false;
sum.setAttribute("disabled", "");
subtract.setAttribute("disabled", "");
multiply.setAttribute("disabled", "");
divide.setAttribute("disabled", "");
calc.addEventListener("click", function (e) {
  inputNum = e.target.textContent;
  if (calcScreen.textContent.indexOf(0) === 0 && calcScreen.textContent.length <= 2) {
    calcScreen.textContent = calcScreen.value.slice(1);
  }
  if (e.target.classList.contains("num") || e.target.classList.contains("decimal")) {
    concatedStr.push(inputNum);
    calcScreen.textContent += inputNum;
    removeDisabled();
  }
  if (calcScreen.value.length === 0) {
    calcScreen.textContent = 0;
  }
  // if (String(result[0]).length >= 14) {
  //   calcScreen.textContent = Number(addResult).toPrecision(14);
  // } //ne znam zosto ova ne funkcionira
  if (hasResult === true && e.target.classList.contains("num")) {
    for (let num of nums) {
      num.setAttribute("disabled", "");
    }
    //narednive 2 linii kod se poradi toa sto posle ovoj loop za stavanje disabled, ednas dozvoluva kopce so borjka da bide kliknato - ne znam zosto
    calcScreen.textContent = calcScreen.value.slice(0, calcScreen.value.length - 1);
    concatedStr = [];
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
  if (calcScreen.textContent === "Infinity" || String(addResult).length >= 19 || calcScreen.textContent === `Infinity${inputNum}`) {
    calcScreen.textContent = `Error. Can't divide by 0 or too big number. Restarting...`;
    calcScreen.classList.add("screen-sm");
    setTimeout(resetting, 2000);
  }
});
equals.addEventListener("click", function () {
  //   calcScreen.textContent = eval(calcScreen.textContent); // ova e lepota :)
  result.push(concatedStr.join(""));
  calcScreen.textContent = operate(input, result);
  concatedStr = [];
  hasResult = true;
  attempts++;
  console.log(attempts);
  if (attempts === maxClicks || result.length <= 1) {
    this.setAttribute("disabled", "");
  }
  if (String(addResult).includes(".")) {
    decimal.setAttribute("disabled", "");
  }
  result.push(addResult);
  return result.splice(0, result.length - 1);
});

reset.addEventListener("click", resetting);

backspace.addEventListener("click", function () {
  concatedStr = concatedStr.slice(0, concatedStr.length - 1);
  calcScreen.textContent = calcScreen.textContent.slice(0, calcScreen.textContent.length - 1);
  result[0] = calcScreen.textContent.slice(0);
  // if (addResult >= 0) {
  //   addResult = Number(String(addResult).slice(0, String(addResult).length - 1));
  // }
  if (result.length <= 1 || attempts === maxClicks) {
    equals.setAttribute("disabled", "");
  }
  if (String(addResult).includes(".")) {
    decimal.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.includes("×")) {
    result[0] = calcScreen.textContent.slice(0, calcScreen.textContent.indexOf("×"));
  }
  if (calcScreen.textContent.includes("+")) {
    result[0] = calcScreen.textContent.slice(0, calcScreen.textContent.indexOf("+"));
  }
  if (calcScreen.textContent.includes("-")) {
    result[0] = calcScreen.textContent.slice(0, calcScreen.textContent.indexOf("-"));
  }
  if (calcScreen.textContent.includes("÷")) {
    result[0] = calcScreen.textContent.slice(0, calcScreen.textContent.indexOf("÷"));
  }
  removeDisabled();
  return result.splice(0, result.length - 1); //ima problem SAMO ako direktno pri resetirana sostojba se zapise broj i pocne da se brise pred da se stavi operator
  //ako e se dojde so brisenje do pocetok (ili 0), togas pri stiskanje na brojka se pojavuva brojka ama po stiskanje operator se brise brojkata i ostanuva operatorot, a calculator-ot ne funkcionira
  //ako se brise minimum dvocifren broj i se stigne do prvata brojka od toj broj (pr.briseme 67 do 6), togas gi sobira ovie dve brojki (6 i 7)
  //vo site drugi sitaucii, raboti kako sto treba
});
function execute() {
  result.push(concatedStr.join(""));
  if (result.includes("")) {
    result.splice(result.length - 1, 1);
  }
  calcScreen.textContent = operate(input, result);
  concatedStr = [];
  hasResult = false;
  attempts++;
  if (result.length <= 1) {
    equals.setAttribute("disabled", "");
  }
  reset.removeAttribute("disabled", "");
  for (let num of nums) {
    num.removeAttribute("disabled", "");
  }
  decimal.removeAttribute("disabled", "");
}
sum.addEventListener("click", function (e) {
  execute();
  if (attempts === maxClicks) {
    this.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.indexOf(0) !== 0) {
    calcScreen.textContent += "+";
  }
  subtract.setAttribute("disabled", "");
  multiply.setAttribute("disabled", "");
  divide.setAttribute("disabled", "");
  input = e.target.id;
  result.push(addResult);
  return result.splice(0, result.length - 1);
});
subtract.addEventListener("click", function (e) {
  execute();
  if (attempts === maxClicks) {
    this.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.indexOf(0) !== 0) {
    calcScreen.textContent += "-";
  }
  sum.setAttribute("disabled", "");
  multiply.setAttribute("disabled", "");
  divide.setAttribute("disabled", "");
  input = e.target.id;
  result.push(addResult);
  return result.splice(0, result.length - 1);
});
multiply.addEventListener("click", function (e) {
  execute();
  if (attempts === maxClicks) {
    this.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.indexOf(0) !== 0) {
    calcScreen.textContent += "×";
  }
  sum.setAttribute("disabled", "");
  subtract.setAttribute("disabled", "");
  divide.setAttribute("disabled", "");
  input = e.target.id;
  result.push(addResult);
  return result.splice(0, result.length - 1);
});
divide.addEventListener("click", function (e) {
  execute();
  if (attempts === maxClicks) {
    this.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.indexOf(0) !== 0) {
    calcScreen.textContent += "÷";
  }
  sum.setAttribute("disabled", "");
  subtract.setAttribute("disabled", "");
  multiply.setAttribute("disabled", "");
  input = e.target.id;
  result.push(addResult);
  return result.splice(0, result.length - 1);
});
decimal.addEventListener("click", function () {
  attempts++;
  hasResult = false;
  if (attempts === maxClicks) {
    this.setAttribute("disabled", "");
  }
  if (calcScreen.textContent.indexOf(0) === 0) {
    calcScreen.textContent += "."; //ova e problem na start
  }
  sum.setAttribute("disabled", "");
  subtract.setAttribute("disabled", "");
  multiply.setAttribute("disabled", "");
  divide.setAttribute("disabled", "");
});

let addResult = 0;
function operate(operator, array) {
  if (operator === "sum") {
    addResult = array.reduce((a, b) => Number(a) + Number(b));
  }
  if (operator === "subtract") {
    addResult = array.reduce((a, b) => a - b);
  }
  if (operator === "multiply") {
    addResult = array.reduce((a, b) => a * b);
  }
  if (operator === "divide") {
    addResult = array.reduce((a, b) => a / b);
  }
  return addResult;
}
