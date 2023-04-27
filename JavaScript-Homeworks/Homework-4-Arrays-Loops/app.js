// Example
// Action: Write a JavaScript program to read ten array values, determine the largest value, and print it
const tenElementsArray = [6560, 20345, 6, 77, 3450, 87, 23, 877, 1234, 8];
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// USING THE WHILE LOOP
let maxOfTenElementsArrayW = 0;
let counterForWhile = 0;
while (counterForWhile < tenElementsArray.length) {
  if (tenElementsArray[counterForWhile] > maxOfTenElementsArrayW) {
    maxOfTenElementsArrayW = tenElementsArray[counterForWhile];
  }
  counterForWhile++;
}
console.log(maxOfTenElementsArrayW);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// USING THE FOR LOOP
let maxOfTenElementsArrayF = 0;
for (let i = 0; i < tenElementsArray.length; i++) {
  if (tenElementsArray[i] > maxOfTenElementsArrayF) {
    maxOfTenElementsArrayF = tenElementsArray[i];
  }
}
console.log(maxOfTenElementsArrayF);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// USING THE FOR OF LOOP
let maxOfTenElementsArrayFO = 0;
for (let item of tenElementsArray) {
  if (item > maxOfTenElementsArrayFO) {
    maxOfTenElementsArrayFO = item;
  }
}
console.log(maxOfTenElementsArrayFO);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// USING THE REDUCE METHOD
const maxValue = tenElementsArray.reduce((max, curr) => {
  if (max > curr) {
    return max;
  }
  return curr;
});
console.log(maxValue);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDENT EXERCISE
// Decription: The Math object allows you to perform mathematical tasks.
// Math.pow(x,y); - Returns the value of x to the power of y
// Action: Write a JavaScript program to write the sum of squares of the numbers from 101 to 150
// Time to accomplish: 15 minutes.
let sumOfSquares = 0;
for (let i = 101; i <= 150; i++) {
  let itemSquare = Math.pow(i, 2);
  sumOfSquares += itemSquare;
}
console.log(sumOfSquares);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXAMPLE
// Action: Write a JavaScript program that will read in a number and write out its digits
// BONUS: I PUT TNE STRINGS BACK TO AN ARRAY AS NUMBERS
function readNumber(numInp) {
  let numToStr = String(numInp);
  const numToStrToNumArray = [];
  for (let i = 0; i < numToStr.length; i++) {
    console.log(numToStr[i]);
    numToStrToNumArray.push(Number(numToStr[i]));
  }
  console.log(numToStrToNumArray);
}
readNumber(3456);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDENT EXERCISE - #1
// FIND NUMBERS IN ARRAY USING FOR OF LOOP IN A FUNCTION
const arrayWithMultipleSameNumbers = [
  2, 2, 5, 3, 3, 4, 5, 6, 7, 8, 9, 6, 9, 8, 9, 0, 4, 5, 6, 8, 9, 10, 5, 3, 5, 8,
  9, 0, 0, 0, 0, 0, 1, 2, 4, 6, 7, 8, 0, 4, 4, 5, 7, 6, 8, 9, 1, 3, 4, 6, 7, 9,
  3, 4, 5, 10,
];
function findNumber(number, array) {
  let occurency = 0;
  for (let item of array) {
    if (item === number) {
      occurency++;
    }
  }
  console.log(
    `There are ${occurency} occurencies of number ${number} in the array`
  );
}
findNumber(4, arrayWithMultipleSameNumbers);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIND NUMBERS IN ARRAY USING REDUCE
const reducedResult = arrayWithMultipleSameNumbers.reduce(
  (numberInArray, timesOfOccurance) => {
    // console.log(timesOfOccurance);
    if (numberInArray[timesOfOccurance] === undefined) {
      numberInArray[timesOfOccurance] = 1;
    } else {
      numberInArray[timesOfOccurance] += 1;
    }
    //   console.log(numberInArray);
    //   console.log("****************************");
    return numberInArray;
  },
  {}
);
console.log(reducedResult);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDENT EXERCISE - #2
// FILTER ODD/EVEN NUMBERS FUNCTION
// PLEASE COMMENT OUT THE FOLLOWING VARIABLE TO GET THE PROMPT GOING

// let inputForExcercise2 = prompt(
//   'Enter "odd" or "even" to get all odd or even numbers in an array'
// ).toLowerCase();

function isOddorEven(array, type) {
  let itemTypeResult = 0;
  const oddOrEvenArray = [];
  if (type !== "odd" && type !== "even") return alert("Invalid input"); //using early return:)
  for (let item of array) {
    itemTypeResult = item % 2;
    if (type === "even" && itemTypeResult === 0 && item !== 0)
      oddOrEvenArray.push(item);
    if (type === "odd" && itemTypeResult === 1) oddOrEvenArray.push(item);
  }
  return alert(
    `Only the ${type.toUpperCase()} numbers from the previous array are pushed to the new array ${oddOrEvenArray}`
  );
}

// PLEASE COMMENT OUT THE FOLLOWING FUNCTION INVOKING TO GET IT GOING
// isOddorEven(arrayWithMultipleSameNumbers, inputForExcercise2);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #1
// Create a function called tellStory()
// BONUS Added gender parameter for changing he and she in the text
function tellStory(name, gender, mood, activity) {
  alert(
    `This is ${name}. ${name} is a nice person. Today ${
      gender === "male" ? "he" : "she"
    } is ${mood} because ${
      gender === "male" ? "he" : "she"
    } is ${activity} all day. The end.`
  );
}

// PLEASE COMMENT OUT THE FOLLOWING FUNCTION INVOKING TO GET IT GOING
// tellStory("Mile", "male", "excited", "writing homeworks and studying");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #2
// Write a function that will take an array of 5 numbers as an argument and return the sum.
// A bit of more advanced stuff here using REST parameter instead of passing an array as an argument
function validateNumber(numToValidate) {
  if (Number.isNaN(numToValidate) || typeof numToValidate !== "number") {
    return false;
  }
  return true;
}
function sum5NumbersFunction(...numbers) {
  let sum5Numbers = 0;
  for (let number of numbers) {
    if (!validateNumber(number)) {
      return "Invalid Number";
    }
    sum5Numbers += number;
  }
  return sum5Numbers;
}
// PLEASE COMMENT OUT THE FOLLOWING FUNCTION INVOKING TO GET IT GOING
// const printSum5Numbers = sum5NumbersFunction(1, 2, 3, 4, 5);
// console.log(printSum5Numbers);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #3
// Used the given array in the homework and also used plain generated lorem text split into an array and put back together as a whole big string

let randomWordsArray = ["Hello", "there", "students", "of", "SEDC", "!"];

let lorem =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia labore minus nulla, animi maiores dolores excepturi dolore mollitia vero reprehenderit quisquam similique quae? Ratione eligendi quae laboriosam pariatur adipisci quod sunt? Cupiditate, soluta ipsam! Nostrum aut vel illo, velit tempore rem enim obcaecati fugit, quae, quisquam ut. Nesciunt, laboriosam dolores.";

const convertedLorem = lorem.split(" ");
// console.log(convertedLorem);

function createBigString(array) {
  let bigString = "";
  for (let words of array) {
    bigString += words += " ";
  }
  return bigString;
}
// PLEASE COMMENT OUT THE FOLLOWING FUNCTION INVOKING TO GET IT GOING
// const printBigString1 = createBigString(randomWordsArray);
// const printBigString2 = createBigString(convertedLorem);
// console.log(printBigString1);
// console.log(printBigString2);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #4
// Title: Looping structures
for (let i = 1; i <= 20; i++) {
  //   console.log(`${i % 2 === 0 ? "\n" : " "} ${i}`); // ne mi e jasno zosto so conditional operator ne generira nov red tuku go zgolemuva samiot red na parnata brojka
  if (i % 2 === 0) {
    console.log(i);
    console.log(`\n`);
  }
  if (i % 2 === 1) {
    console.log(" ", i);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #5
// Title: Looping structures
let minMaxSumArray = ["z", "~", 115, 110, 85, 95, null, -1, true, undefined];
// function minMaxSum(array) {
//   //at first i tried with 2 separate for of loops with the same logic and it works
//   for (let minItem of array) if (minItem < minNum) minNum = minItem;
//   console.log(`The min sum is ${minNum}`);
//   for (let maxItem of array) if (maxItem > maxNum) maxNum = maxItem;
//   console.log(`The max sum is ${maxNum}`);
//   return (sumMinMax = minNum + maxNum);
// }
let minNum = minMaxSumArray[6]; //put the index of the random  because if i initialize this variable with 0, that would be automatically the min value
let maxNum = 0;
let sumMinMax = 0;
function minMaxSum(array) {
  //...but this works with less code
  for (let item of array) {
    if (typeof item === "string") item = item.charCodeAt(0);
    if (item < minNum) minNum = item;
    if (item > maxNum) maxNum = item;
  }
  //   console.log(`The min sum is ${minNum}`);
  //   console.log(`The max sum is ${maxNum}`);
  return (sumMinMax = minNum + maxNum);
}
const printMinMaxSum = minMaxSum(minMaxSumArray);
console.log(
  `The sum of the minimum number ${minNum} and the maximum number ${maxNum} is ${printMinMaxSum}`
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK #6
// Title: Looping structures
// Description:Write a javascript function that:
// When given 2 arrays of students firstNames and lastNames will return a new array with students full names
// Every name should have a numeric value before it
// Ex: first = ["Bob", "Jill"], last = ["Gregory", "Wurtz"]
// Result: full = ["1. Bob Gregory", "2. Jill Wurtz"]

const firstNames = ["Mile", "Bojan", "Ivan", "Eleonora", "Bisera"];
const lastNames = [
  "Todorovski",
  "Damchevski",
  "Lazarevski",
  "Gjorgjieva",
  "Todorovska",
];
const fullNamesArray = [];
function fullName(namesArray, surnamesArray) {
  if (namesArray.length !== surnamesArray.length)
    return "Please provide arrays with same lenght so we don`t get undefined values";
  for (let i = 0; i < namesArray.length; i++) {
    fullNamesArray.push(`${i + 1}.${namesArray[i]} ${surnamesArray[i]}`);
  }
  console.log(fullNamesArray);
}
const printFullName = fullName(firstNames, lastNames);
