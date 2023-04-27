// BONUS HOMEWORK
// Create a recipe page from inputs

// Ask the user for the name of the recipe
// Ask the user how many ingredients do we need for the recipe
// Ask the user for the name of every ingredient
// Print the name of the recipe in the HTML as heading element, ex: h1-h6
// Print all ingredients as an unordered list in the HTML
// Extra: Use a table if you want to be fancy :)

let recipeNameInput = prompt("Enter recipe name");
let ingredientNumInput = Number(
  prompt("Please state the total number of ingredients")
);
let ingredientNameInput = 0;
let ingredientArray = [];
for (let i = 1; i <= ingredientNumInput; i++) {
  ingredientNameInput = prompt("Enter the name of every ingredient");
  ingredientArray.push(ingredientNameInput);
}
let container = document.getElementById("only"); //div
let table = document.getElementById("tbody"); //tbody
let ingredientsList = document.getElementById("ingredientsList"); //ul
function recipe(recipeName, ingredientNum, ingredientName) {
  if (Number.isNaN(ingredientNum) || typeof ingredientNum !== "number") {
    return alert("Invalid input. Please enter a valid number");
  }
  //for the whole list
  let newH1 = document.createElement("h1");
  let newH2 = document.createElement("h2");
  let newH3 = document.createElement("h3");
  newH1.innerHTML = recipeName;
  newH2.innerHTML = `This recipe is consisted of ${ingredientNum} ingredients`;
  newH3.innerHTML = `These are the needed ingredients`;
  container.prepend(newH1);
  container.append(newH2);
  container.append(newH3);
  //for table
  let newRow = document.createElement("tr");
  let newRowData = document.createElement("td");
  newRowData.innerHTML = "Item";
  newRow.append(newRowData);
  table.append(newRow);
  // ingredientsList.innerHTML = ""; //works fine w/o this line
  for (let item of ingredientName) {
    ingredientsList.innerHTML += `<li>${item}</li>`;
    table.innerHTML += `<tr><td>${item}</td></tr>`;
  }
}
const printRecipe = recipe(
  recipeNameInput,
  ingredientNumInput,
  ingredientArray
);
