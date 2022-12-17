// STUDENT EXERCISE - #1
// MANIPULATE THE DOM
// Select the first div
let firstDiv = document.getElementById("first");
firstDiv.style.backgroundColor = "green";
// Select all paragraphs
let allParagraphs = document.getElementsByTagName("p");
for (let paragraph of allParagraphs) {
  paragraph.style.backgroundColor = "rgba(255,70,125,0.8)";
}
// Select the last div
let lastDiv = document.querySelector("div:nth-of-type(3)");
lastDiv.style.backgroundColor = "yellow";
// Select the header 3 in the last div
let h3InLastDiv = lastDiv.lastElementChild; //ne so lastChild bidejki vraka textNode odnsono eventualen tekst ili stisnat ENTER pomegju elementite
h3InLastDiv.style.border = "10px solid black";
// Select the header 1 in the last div
let h1InLastDiv = document.querySelector("div:last-of-type>h1");
// h1InLastDiv.style.textDecoration = "line-through red";
h1InLastDiv.style.border = "10px solid green";
// Get the text from the first paragraph in the second div
let secondDiv = document.getElementsByClassName("anotherDiv")[0];
let pTextInSecondDiv = (secondDiv.firstElementChild.textContent +=
  "asdasdasdsdasd".toUpperCase());
// Add the word "text" to the text element in the second div
let textElementInSecondDiv = (secondDiv.children[1].innerText += " TEXT");
// Change the text of the header 1 in the last div
h1InLastDiv.innerHTML += `<span id='underlined'> Added text only</span>`;
let spanInH1inLastDiv = (document.getElementById(
  "underlined"
).style.textDecoration = "underline black");
// Change the text of the header 3 in the last div
h3InLastDiv.innerHTML = `Text changed.Good job`;

// Note:You can't change the HTML - NOT A BIT :)

////////////////////////////////////////////////////////////////////////////////////////////////////
// STUDENT EXERCISE - #2
// WEIGHT CALCULATOR IN CHICKENS
let actualWeightInput = Number(
  prompt("Enter your weight and see your weight in chickens!!!")
);
function weightInChickens(kgs) {
  if (Number.isNaN(kgs) || typeof kgs !== "number") {
    return "Invalid input. Please enter a valid number";
  }
  const chickenWeight = 0.5;
  let convertedActualToChikenWeight = kgs * chickenWeight;
  return `Your ${kgs} kilograms weight as much as ${convertedActualToChikenWeight} chickens`;
}
const printedWeight = weightInChickens(actualWeightInput);
console.log(printedWeight);
let se2Article = document.getElementById("se2");
se2Article.style.border = "5px solid black";
let newH1 = document.createElement("h1");
newH1.classList.add("se2H1");
newH1.innerHTML = `<em>EXTRA EXTRA READ ALL ABOUT IT!!! CONVERT HUMAN TO CHICKEN WEIGHT</em>`;
se2Article.prepend(newH1);
let articleP = document.querySelector("#se2>p");
articleP.innerHTML = `<strong>${printedWeight}</strong>`;
