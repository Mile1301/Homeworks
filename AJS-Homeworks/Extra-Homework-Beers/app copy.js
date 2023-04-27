let paginated_url = "https://api.punkapi.com/v2/beers?page=";
let beers_index = "https://api.punkapi.com/v2/beers";
const renderContainer = document.querySelector(".render");
const pageSize = document.querySelector(".pageSize");
const forPageSize = document.querySelector(".forPageSize");
const filterStuff = document.querySelector(".filterStuff");
const forFilterStuff = document.querySelector(".forFilterStuff");
const forPageNum = document.querySelector(".forPageNum");
const monthBefore = document.querySelector("#monthBefore");
const monthAfter = document.querySelector("#monthAfter");
const monthBeforeForm = document.querySelector(".monthBeforeForm");
const monthAfterForm = document.querySelector(".monthAfterForm");
const navSearchForm = document.querySelector(".navSearchForm");
const randomBeer = document.querySelector(".random");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");

let chooseValue = 25;
let searchTerm = "";
config = { params: { per_page: chooseValue } };
let pageNum = 1;
let toContinue = true;
const someArr = [];
// const resultForFilter = [];
const getBeers = async (url, inputPageNum, configHeaderParam, renderFunc) => {
  const result = await axios.get(`${url}${inputPageNum}`, configHeaderParam);
  // resultForFilter.push(...result.data);
  if (result.data.length <= chooseValue - 1) {
    toContinue = false;
    pageNum--;
    forPageNum.innerHTML = `Showing page ${pageNum}`;
    return getBeers(paginated_url, pageNum, config, renderAllBeer);
  } else {
    if (pageNum === 1) previousBtn.setAttribute("disabled", true);
    // someArr.push(...result.data);
    // console.log(someArr);
    renderFunc(result.data);
  }
  const mappedResult = result.data.map((el) => el);
  const mappedResult1 = result.data.map((el) => el);
  const mappedResultAlc = result.data.map((el) => el);
  const mappedResultAlc1 = result.data.map((el) => el);
  const nameAsc = mappedResult.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const nameDesc = mappedResult1.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  const alcAsc = mappedResultAlc1.sort((a, b) => a.abv - b.abv); // da se vidi kako se sortiraat decimalni broevi
  const alcDesc = mappedResult.sort((a, b) => b.abv - a.abv);
  const bitAsc = mappedResultAlc1.sort((a, b) => a.ibu - b.ibu);
  const bitDesc = mappedResultAlc.sort((a, b) => b.ibu - a.ibu);
  renderFunc(result.data);

  if (searchTerm === "Name Descending") renderFunc(nameDesc);
  if (searchTerm === "Alcohol % Ascending") renderFunc(alcAsc);
  if (searchTerm === "Alcohol % Descending") renderFunc(alcDesc);
  if (searchTerm === "Bitterness Ascending") renderFunc(bitAsc);
  if (searchTerm === "Bitterness Descending") renderFunc(bitDesc);
  // console.log(result.data.length);
  // someArr.push(...result.data);
};
{
  /* <img src="${item.image_url}" class="card-img-top d-block img-fluid img-thumbnail " alt="..."> */
}
const renderAllBeer = (endpointInput) => {
  renderContainer.innerHTML = "";
  for (let item of endpointInput) {
    renderContainer.innerHTML += `
        <div class="card d-inline-block m-3 mainCard">

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
// getBeers(paginated_url, pageNum, config, renderAllBeer);
///////////////////////////////////////////////////////////

const getBeerData = async function (pageNo = 1) {
  let beer_url = beers_index + `?page=${pageNo}&per_page=${chooseValue}`;
  const response = await fetch(beer_url);
  const result = await response.json();
  // renderFunc(result);
  return result;
};
// getUsers(1, renderAllBeer);
const getEntireBeerList = async function (pageNo = 1) {
  const results = await getBeerData(pageNo);
  console.log("Retreiving data from API for page : " + pageNo);
  if (results.length > 0) {
    return results.concat(await getEntireBeerList(pageNo + 1));
  } else {
    return results;
  }
};

(async () => {
  const entireList = await getEntireBeerList();
  console.log(entireList);
  someArr.push(...entireList);
  renderAllBeer(someArr);
})();

///////////////////////////////////////////////////////////

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
  const mappedResult = someArr.map((el) => el);
  const mappedResult1 = someArr.map((el) => el);
  const mappedResultAlc = someArr.map((el) => el);
  const mappedResultAlc1 = someArr.map((el) => el);
  const mappedResultBit = someArr.map((el) => el);
  const mappedResultBit1 = someArr.map((el) => el);
  const nameAsc = mappedResult.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const nameDesc = mappedResult1.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  const alcAsc = mappedResultAlc.sort((a, b) => a.abv - b.abv); // da se vidi kako se sortiraat decimalni broevi
  const alcDesc = mappedResultAlc1.sort((a, b) => b.abv - a.abv);
  const bitAsc = mappedResultBit.sort((a, b) => a.ibu - b.ibu);
  const bitDesc = mappedResultBit1.sort((a, b) => b.ibu - a.ibu);
  if (searchTerm === "Name Ascending") renderAllBeer(nameAsc);
  if (searchTerm === "Name Descending") renderAllBeer(nameDesc);
  if (searchTerm === "Alcohol % Ascending") renderAllBeer(alcAsc);
  if (searchTerm === "Alcohol % Descending") renderAllBeer(alcDesc);
  if (searchTerm === "Bitterness Ascending") renderAllBeer(bitAsc);
  if (searchTerm === "Bitterness Descending") renderAllBeer(bitDesc);
  // getBeers(paginated_url, pageNum, config, renderAllBeer);
  getUsers(1, renderAllBeer);
});

monthBeforeForm.addEventListener("submit", function (e) {
  renderContainer.innerHTML = "";
  pageNum = 1;
  config = { params: { brewed_before: monthBefore.value.split("-")[1] + "-" + monthBefore.value.split("-")[0] } };
  forFilterStuff.innerHTML = `Showing beers firstly brewed before ${monthBefore.value.split("-")[1] + "-" + monthBefore.value.split("-")[0]}`;
  monthBefore.value = "";
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});
monthAfterForm.addEventListener("submit", function (e) {
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
      <img src="${beerID.image_url}" class="img-fluid rounded-start" alt="..." />
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
}

navSearchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let formSearch = this.elements.query.value;
  const config = { params: { beer_name: formSearch } };
  await getBeers(beers_index, "", config, renderAllBeer);
  this.elements.query.value = "";
});

randomBeer.addEventListener("click", async function () {
  const id = "random";
  const oneBeer = await getSingleBeer(id);
  renderSingleBeer(oneBeer);
});

nextBtn.addEventListener("click", function () {
  pageNum++;
  if (toContinue === false) return nextBtn.setAttribute("disabled", true);
  getBeers(paginated_url, pageNum, config, renderAllBeer);
  previousBtn.removeAttribute("disabled");
  forPageNum.innerHTML = `Showing page ${pageNum}`;
});

previousBtn.addEventListener("click", function () {
  if (pageNum > 1) pageNum--;
  toContinue = true;
  nextBtn.removeAttribute("disabled");
  forPageNum.innerHTML = `Showing page ${pageNum}`;
  getBeers(paginated_url, pageNum, config, renderAllBeer);
});
