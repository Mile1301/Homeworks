let paginated_url = "https://api.punkapi.com/v2/beers?page=";
let beers_index = "https://api.punkapi.com/v2/beers";
const renderContainer = document.querySelector(".render");
const pageSize = document.querySelector(".pageSize");
const forPageSize = document.querySelector(".forPageSize");
const filterStuff = document.querySelector(".filterStuff");
const forFilterStuff = document.querySelector(".forFilterStuff");
const forPageNum = document.querySelector(".forPageNum");
const forResults = document.querySelector(".forResults");
const monthBefore = document.querySelector("#monthBefore");
const monthAfter = document.querySelector("#monthAfter");
const monthBeforeForm = document.querySelector(".monthBeforeForm");
const monthAfterForm = document.querySelector(".monthAfterForm");
const navSearchForm = document.querySelector(".navSearchForm");
const randomBeer = document.querySelector(".random");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const pageSizeBtn = document.querySelector(".psb");
const filterStuffBtn = document.querySelector(".fsb");

let chooseValue = 25;
let searchTerm = "";
let config = "";
let pageNum = 1;
let toContinue = true;

const getBeers = async (url, inputPageNum, configHeaderParam, renderFunc) => {
  const result = await axios.get(`${url}${inputPageNum}`, configHeaderParam);

  if (result.data.length === 0) {
    toContinue = false;
    let previousPageNum = pageNum - 1;
    pageNum--;
    forPageNum.innerHTML = `Showing page ${pageNum}`;
    return getBeers(paginated_url, previousPageNum, config, renderAllBeer);
  }
  if (pageNum === 1) previousBtn.setAttribute("disabled", true);
  renderFunc(result.data);

  forResults.innerHTML = `${renderContainer.childElementCount} results on page`;

  const mappedResult = result.data.map((el) => el);
  const mappedResult1 = result.data.map((el) => el);
  const mappedResultAlc = result.data.map((el) => el);
  const mappedResultAlc1 = result.data.map((el) => el);
  const mappedResultBit = result.data.map((el) => el);
  const mappedResultBit1 = result.data.map((el) => el);

  const nameAsc = mappedResult.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const nameDesc = mappedResult1.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  });
  const alcAsc = mappedResultAlc.sort((a, b) => a.abv - b.abv);
  const alcDesc = mappedResultAlc1.sort((a, b) => b.abv - a.abv);
  const bitAsc = mappedResultBit.sort((a, b) => a.ibu - b.ibu);
  const bitDesc = mappedResultBit1.sort((a, b) => b.ibu - a.ibu);

  if (searchTerm === "Name Ascending") renderFunc(nameAsc);
  if (searchTerm === "Name Descending") renderFunc(nameDesc);
  if (searchTerm === "Alcohol % Ascending") renderFunc(alcAsc);
  if (searchTerm === "Alcohol % Descending") renderFunc(alcDesc);
  if (searchTerm === "Bitterness Ascending") renderFunc(bitAsc);
  if (searchTerm === "Bitterness Descending") renderFunc(bitDesc);
};

const renderAllBeer = (endpointInput) => {
  renderContainer.innerHTML = "";
  for (let item of endpointInput) {
    renderContainer.innerHTML += `
        <div class="card d-inline-block m-3 mainCard">
            <img src="${
              item.image_url === null ? (item.image_url = "./img/keg.png") : item.image_url
            }" class="card-img-top d-block img-fluid img-thumbnail " alt="...">
            <div class="card-body theCard">
                <h5 class="card-title titleForHeight mb-0">${item.id} - ${item.name}</h5>
                <p class="card-text textForHeight mb-0">${item.tagline}</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Alcohol ${item.abv}%</li>
                <li class="list-group-item">Bitterness ${item.ibu}</li>
                <li class="list-group-item">Brewed from: ${item.first_brewed}</li>
            </ul> 
            <a href="#" class="btn btn-primary" id='${item.id}'>More details</a>
            </div>
        </div>
        `;
  }
  const beers = document.querySelectorAll(".mainCard>div");
  for (let item of beers) {
    const btn = item.lastElementChild;
    btn.addEventListener("click", async function (event) {
      const id = event.target.id;
      const oneBeer = await getSingleBeer(id);
      renderSingleBeer(oneBeer);
    });
  }
};
getBeers(paginated_url, pageNum, config, renderAllBeer);

pageSize.addEventListener("click", function (e) {
  if (e.target.nodeName === "LI") chooseValue = Number(e.target.innerHTML.slice(5));
  pageNum = 1;
  config = { params: { per_page: chooseValue } };
  forPageSize.innerHTML = `Showing ${chooseValue} beers per page`;
  forPageNum.innerHTML = `Showing page ${pageNum}`;
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});
filterStuff.addEventListener("click", function (e) {
  if (e.target.nodeName === "LI") searchTerm = e.target.innerHTML;
  forFilterStuff.innerHTML = `Showing by ${searchTerm}`;
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});

monthBeforeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderContainer.innerHTML = "";
  pageNum = 1;
  config = { params: { brewed_before: monthBefore.value.split("-")[1] + "-" + monthBefore.value.split("-")[0] } };
  forFilterStuff.innerHTML = `Showing beers firstly brewed before ${monthBefore.value.split("-")[1] + "-" + monthBefore.value.split("-")[0]}`;
  monthBefore.value = "";
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});
monthAfterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderContainer.innerHTML = "";
  pageNum = 1;
  config = { params: { brewed_after: monthAfter.value.split("-")[1] + "-" + monthAfter.value.split("-")[0] } };
  forFilterStuff.innerHTML = `Showing beers firstly brewed after ${monthAfter.value.split("-")[1] + "-" + monthAfter.value.split("-")[0]}`;
  monthAfter.value = "";
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});

async function getSingleBeer(id) {
  const result = await axios.get(`${beers_index}/${id}`);
  return result.data[0];
}

function renderSingleBeer(beerID) {
  renderContainer.innerHTML = "";
  const foodPairList = document.createElement("ul");
  foodPairList.classList.add("list-group");
  for (let item of beerID.food_pairing) {
    foodPairList.innerHTML += `
        <li class="list-group-item">"${item}" </li>
        `;
  }
  renderContainer.innerHTML += `
  <div class="container">
  <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4 singleImageContainer">
      <img src="${beerID.image_url === null ? (beerID.image_url = "./img/keg.png") : beerID.image_url}" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title"><strong>${beerID.name}</strong> ${beerID.tagline}</h5>
        <p class="card-text">${beerID.description}</p>
        <p class="card-text">Brewed ${beerID.first_brewed}</p>
        <p class="card-text">Alcohol ${beerID.abv}%</p>
        <p class="card-text">Bitterness ${beerID.ibu}</p>
        <p class="card-text lastP"><strong>Food Pairing</strong></p>
        <a href="./beers.html" class="btn btn-primary">Back to All Beers</a>
      </div>
    </div>
    </div>
</div>
</div>
        `;
  const lastP = document.querySelector(".lastP");
  lastP.appendChild(foodPairList);
  displayNone();
}

function displayNone() {
  if (renderContainer.childElementCount < chooseValue) {
    nextBtn.classList.add("displayNone");
    previousBtn.classList.add("displayNone");
    pageSizeBtn.classList.add("displayNone");
    filterStuffBtn.classList.add("displayNone");
    forPageSize.classList.add("displayNone");
    forPageNum.classList.add("displayNone");
    forResults.classList.add("displayNone");
    forFilterStuff.classList.add("displayNone");
  }
}
function displayOn() {
  nextBtn.classList.remove("displayNone");
  previousBtn.classList.remove("displayNone");
  pageSizeBtn.classList.remove("displayNone");
  filterStuffBtn.classList.remove("displayNone");
  forPageSize.classList.remove("displayNone");
  forPageNum.classList.remove("displayNone");
  forResults.classList.remove("displayNone");
  forFilterStuff.classList.remove("displayNone");
}

navSearchForm.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    displayOn();
    pageNum = 1;
    nextBtn.removeAttribute("disabled");
    forPageNum.innerHTML = `Showing page ${pageNum}`;
    let formSearch = this.elements.query.value;
    config = { params: { beer_name: formSearch } };
    await getBeers(beers_index, "", config, renderAllBeer);
    this.elements.query.value = "";
    forResults.innerHTML = `${renderContainer.childElementCount} results on page`;
    if (renderContainer.childElementCount < chooseValue) nextBtn.setAttribute("disabled", true);
  } catch (error) {
    renderContainer.innerHTML = "Sorry!!! No such beer :)";
    displayNone();
  }
});

randomBeer.addEventListener("click", async function () {
  const id = "random";
  const oneBeer = await getSingleBeer(id);
  renderSingleBeer(oneBeer);
  displayNone();
});

nextBtn.addEventListener("click", function () {
  pageNum++;
  if (toContinue === false) return nextBtn.setAttribute("disabled", true);
  previousBtn.removeAttribute("disabled");
  forPageNum.innerHTML = `Showing page ${pageNum}`;
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});

previousBtn.addEventListener("click", function () {
  if (pageNum > 1) pageNum--;
  toContinue = true;
  // if (nextBtn.disabled) getBeers(paginated_url, pageNum - 1, config, renderAllBeer);
  nextBtn.removeAttribute("disabled");
  forPageNum.innerHTML = `Showing page ${pageNum}`;
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});
