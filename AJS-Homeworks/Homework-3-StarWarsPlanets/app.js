const renderFirstPlanetsBtn = document.querySelector(".renderPlanetsBtn");
const renderPlanetsTableBody = document.querySelector(".renderPlanetsTableBody");
const buttonDiv = document.querySelector(".buttonDiv");
const BASE_URL1 = "https://swapi.dev/api/planets/?page=1";
const BASE_URL2 = "https://swapi.dev/api/planets/?page=2";

async function getPlanets(url) {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  renderPlanets(result.results);
}

function renderPlanets(planets) {
  renderPlanetsTableBody.innerHTML = "";
  for (let planet of planets) {
    const planetRow = document.createElement("tr");
    planetRow.innerHTML = `
        <td class="name"><strong>${planet.name}</strong></td>
        <td class="population">${planet.population}</td>
        <td class="climate">${planet.climate}</td>
        <td class="gravity">${planet.gravity}</td>`;
    renderPlanetsTableBody.appendChild(planetRow);
  }
}
function buttonNext() {
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next 10 planets";
  buttonDiv.appendChild(nextButton);
  nextButton.addEventListener("click", function () {
    getPlanets(BASE_URL2);
    buttonPrevious();
    nextButton.classList.toggle("disabled");
  });
}
function buttonPrevious() {
  const previousButton = document.createElement("button");
  previousButton.innerText = "Previous 10 planets";
  buttonDiv.appendChild(previousButton);
  previousButton.addEventListener("click", function () {
    getPlanets(BASE_URL1);
    previousButton.classList.toggle("disabled");
    buttonNext();
  });
}
renderFirstPlanetsBtn.addEventListener(
  "click",
  function () {
    getPlanets(BASE_URL1);
    buttonNext();
  },
  { once: true }
);
