const newBtn = document.createElement("button");
const container = document.querySelector(".container");
newBtn.innerText = "Click Me";
container.appendChild(newBtn);
let id = Math.floor(Math.random() * 82) + 1;
let baseUrl = `https://swapi.dev/api/people/${id}`;
newBtn.addEventListener("click", getDataFromAPI);

async function getDataFromAPI() {
  const response = await fetch(baseUrl);
  const result = await response.json();
  renderDataFromApi(result);
  getDataHomeworld(result.homeworld);
  if (result.vehicles) {
    for (let vehicle of result.vehicles) {
      getDataVehicle(vehicle);
    }
  }
  id = Math.floor(Math.random() * 82) + 1;
  baseUrl = `https://swapi.dev/api/people/${id}`;
}
async function getDataHomeworld(homeworldInput) {
  const response = await fetch(homeworldInput);
  const result = await response.json();
  renderHomeworldData(result);
}
async function getDataVehicle(vehicleInput) {
  const response = await fetch(vehicleInput);
  const result = await response.json();
  renderVehicleData(result);
}

const nameH1 = document.createElement("h1");
let tdHomeworld = document.createElement("td");
let tdVehicles = document.createElement("td");
let table = document.createElement("table");
table.style.border = "1px solid black";
table.style.textAlign = "center";
function renderHomeworldData(charHomeworld) {
  tdHomeworld.append(charHomeworld.name);
}
function renderVehicleData(charVehicles) {
  tdVehicles.append(charVehicles.name);
}
function renderDataFromApi(starWarsChar) {
  nameH1.innerText = "";
  table.innerHTML = "";
  tdHomeworld.innerHTML = "";
  tdVehicles.innerHTML = "";
  nameH1.innerText = `ID#${id} ${starWarsChar.name !== undefined ? starWarsChar.name : "Something went wrong. Try again!".toUpperCase()}`;
  container.appendChild(nameH1);
  let tHead = document.createElement("thead");
  let tHHeight = document.createElement("th");
  tHHeight.innerText = "Height";
  tHead.appendChild(tHHeight);
  let tHWeight = document.createElement("th");
  tHWeight.innerText = "Weight";
  tHead.appendChild(tHWeight);
  let tHEye = document.createElement("th");
  tHEye.innerText = "Eye Color";
  tHead.appendChild(tHEye);
  let tHHair = document.createElement("th");
  tHHair.innerText = "Hair Color";
  tHead.appendChild(tHHair);
  let tHHomeworld = document.createElement("th");
  tHHomeworld.innerText = "Homeworld";
  tHead.appendChild(tHHomeworld);
  let tHVehicle = document.createElement("th");
  tHVehicle.innerText = "Vehicle";
  tHead.appendChild(tHVehicle);
  table.appendChild(tHead);
  let tr = document.createElement("tr");
  let tdHeight = document.createElement("td");
  tdHeight.append(starWarsChar.height);
  let tdWeight = document.createElement("td");
  tdWeight.append(starWarsChar.mass);
  let tdEye = document.createElement("td");
  tdEye.append(starWarsChar.eye_color);
  let tdHair = document.createElement("td");
  tdHair.append(starWarsChar.hair_color);
  tr.appendChild(tdHeight);
  tr.appendChild(tdWeight);
  tr.appendChild(tdEye);
  tr.appendChild(tdHair);
  tr.appendChild(tdHomeworld);
  tr.appendChild(tdVehicles);
  for (let td of [tdHeight, tdWeight, tdEye, tdHair, tdHomeworld, tdVehicles]) {
    td.style.padding = "10px";
    td.style.border = "1px solid black";
  }
  for (let th of [tHHeight, tHWeight, tHEye, tHHair, tHHomeworld, tHVehicle]) {
    th.style.padding = "10px";
    th.style.backgroundColor = "teal";
    th.style.border = "1px solid black";
  }
  table.appendChild(tr);

  container.appendChild(table);
}
