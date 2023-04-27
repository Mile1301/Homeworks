// HOMEWORK PART 1
// Change the page with JavaScript
// Change the text of all paragraphs and headers with javascript
// Note:The html must not be changed
let changeText = document.querySelectorAll("p,h1,h3");
for (let text of changeText) {
  text.innerHTML = "Changed text";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// HOMEWORK PART 2
// Print all numbers from an array and the sum

// Create an array with numbers
let h2NumbersArray = [1, 2, 3, 4, 5];
let newH2NumbersArray = [];
// Print all numbers from the array in a list element, in a new HTML page
let homework2Ul = document.getElementById("h2");
homework2Ul.innerHTML = "";
homework2Ul.style.border = "5px solid black";
homework2Ul.style.listStyle = "none";
let sum = 0;
for (let num of h2NumbersArray) {
  homework2Ul.innerHTML += `<li>${num}</li>`;
  sum += num;
}
// Print out the sum of all of the numbers below the list
homework2Ul.innerHTML += `<li><strong>The sum of the added numbers is ${sum}</strong></li>`;

// Bonus: Try printing the whole mathematical equasion as well ( 2 + 4 + 5 = 11)
function mathEquation(array) {
  let equation = "";
  for (let items of array) {
    equation += items += "+";
  }
  let slicedEquation = equation.slice(0, length - 1);
  return slicedEquation;
}
const printEquation = mathEquation(h2NumbersArray);
homework2Ul.innerHTML += `<li><strong>The whole mathematical equation is ${printEquation} = ${sum}</strong></li>`;
