let requstedNumber = "e";
let requstedNumber1 = -10;
let requstedNumber2 = 10;
let requstedNumber3 = 9;

// Function that takes a number through a parameter and returns if its even or odd
console.log("*****Exercise 2*****");
const resultEx2 = (num) => {
  if (Number.isNaN(num) || typeof num !== "number") return false;
  if (num <= 0) return false;
  if (num % 2 === 0) console.log(`The requested number ${num} is even`);
  if (num % 2 === 1) console.log(`The requested number ${num} is odd`);
};
console.log(resultEx2(requstedNumber));
console.log(resultEx2(requstedNumber1));
resultEx2(requstedNumber2);
resultEx2(requstedNumber3);

// Function that takes a number through a parameter and returns if its positive or negative
console.log("*****Exercise 3*****");
const resultEx3 = (num) => {
  if (Number.isNaN(num) || typeof num !== "number") return false;
  if (num < 0) console.log(`The requested number ${num} is negative`);
  if (num > 0) console.log(`The requested number ${num} is positive`);
};
console.log(resultEx3(requstedNumber));
resultEx3(requstedNumber1);
resultEx3(requstedNumber2);
