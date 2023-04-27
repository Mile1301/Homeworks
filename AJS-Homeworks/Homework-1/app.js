// Task 1
// Write JS program which calculate sum 1+2+3+...n, where n is inputted by keyboard.
let sum = 0;
let sumFromTask1Array = 0;
let nArray = [];
const sumButton = document.querySelector("button");
sumButton.addEventListener("click", executeTask1);
let inputForTask1 = "";
function executeTask1() {
  while (inputForTask1 !== "q") {
    inputForTask1 = prompt("Please enter ONLY number to get sum. Whenever ready, please press q to see the sum");
    if (!inputForTask1) return false;
    if (!/^[a-zA-Z!@#$%^&*?/|{()}]$/.test(inputForTask1) && inputForTask1.indexOf(" ") === -1) nArray.push(inputForTask1);
  }
  calculateSum(nArray);
  reset();
}
function calculateSum(task1Array) {
  for (let number of task1Array) {
    sumFromTask1Array += parseInt(number);
  }
  sum = 1 + 2 + 3 + sumFromTask1Array;
  console.log(`The sum of the numbers You entered ${task1Array.join()} is ${sumFromTask1Array} plus the sum of 1+2+3 totals ${sum}`);
}

function reset() {
  nArray = [];
  sum = 0;
  sumFromTask1Array = 0;
}
//Task 1 - New (required) solution
console.log("Task1");
let inputforMisunderstoodTask1 = prompt("Please enter ONLY number to get sum from that number and all its descendent numbers");
function sumFactorial(x) {
  return x > 1 ? x + sumFactorial(x - 1) : 1;
}
console.log(sumFactorial(Number(inputforMisunderstoodTask1)));

// Task 2
// Print all digits of a given number
console.log("Task2");
let inputNum = 13_453_456_456_780;

const showDigits = [...(inputNum + "")].map((n) => +n);
console.log(showDigits);

// Task 3
// Change the character (-) of the members of the array let numArr = [4, -9, -98, -1, 444, 3, -555];
console.log("Task3");
let numArr = [4, -9, -98, -1, 444, 3, -555];
for (let i = 0; i <= numArr.length; i++) {
  if (numArr[i] < 0) {
    numArr[i] = numArr[i] * -1;
  }
}
console.log(numArr);

// Task 4
// Copy the odd elements from the given one into a new array. Print the new one in the console. const givenArr = [12, 45, 88, 1, 567, 3, 91];
console.log("Task4");
const givenArr = [12, 45, 88, 1, 567, 3, 91];
const newArrayForTask4 = [];
for (let num of givenArr) {
  if (num % 2 === 1) {
    newArrayForTask4.push(num);
  }
}
console.log(newArrayForTask4);

// Task 5
// Delete all elements of the array except the numbers
console.log("Task5");
let test = [true, false, 12, 13, 44, 2345, "Bob", "Jill", false, undefined, 1000, null, "Jack", "", "", 99, "Greg", undefined, NaN, 1, 22];
const newTest = test.filter((onlyNums) => typeof onlyNums === "number");

console.log(newTest);

console.log("Task5-new solution");
let newResult = [];
function cleanAllButNumbers(inputArray) {
  for (let item of inputArray) {
    if (typeof item === "number") {
      newResult.push(item);
    }
  }
  return newResult;
}
console.log(
  cleanAllButNumbers([true, false, 12, 13, 44, 2345, "Bob", "Jill", false, undefined, 1000, null, "Jack", "", "", 99, "Greg", undefined, NaN, 1, 22])
);
