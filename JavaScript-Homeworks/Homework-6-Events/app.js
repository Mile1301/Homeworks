// const body = document.querySelector("body");
// const table = document.createElement("table");
// const rowsSelector = document.querySelector("#rows");
// const spanRow = document.querySelector("#spanRow");
// const spanColumn = document.querySelector("#spanColumn");
// const columnsSelector = document.querySelector("#columns");
// const tHead = document.createElement("thead");
// tHead.innerHTML = `<thead><tr><th colspan=${columns} border = "1px solid black">New Table</th></tr></thead>`;
// const tBody = document.createElement("tbody");
// const button = document.createElement("button");
// button.innerText = "Generate Table";
// body.appendChild(button);
// const resetButton = document.createElement("button");
// resetButton.innerText = "Reset";
// body.appendChild(resetButton);
// let rowsValue = 0;
// let columnsValue = 0;
// let score = 0; //variable in the context of the boolean startTable
// let startTable = true; //to block the button Generate after rendering the table
// function createRowsColumns(rows, columns) {
//   if (startTable) {
//     if (rowsValue > score) {
//       startTable = false;
//       table.style.border = "1px solid black";
//       table.appendChild(tHead);
//       body.appendChild(table);
//       for (let i = 1; i <= rows; i++) {
//         let newTr = document.createElement("tr");
//         tBody.appendChild(newTr);
//         for (let j = 1; j <= columns; j++) {
//           let newTD = document.createElement("td");
//           newTD.style.border = "1px solid black";
//           newTD.innerHTML = `Row${i} Column${j}`;
//           newTr.appendChild(newTD);
//         }
//       }
//     }
//     rowsValue = 0;
//     columnsValue = 0;
//     table.appendChild(tBody);
//   }
// }
// function reset() {
//   //   window.location.reload(); //easiest way
//   tHead.innerHTML = "";
//   tBody.innerHTML = "";
//   rowsSelector.value = 0;
//   columnsSelector.value = 0;
//   rowsValue = 0;
//   columnsValue = 0;
//   spanRow.innerHTML = 0;
//   spanColumn.innerHTML = 0;
//   startTable = true;
// }
// rowsSelector.addEventListener("input", function () {
//   rowsValue = parseInt(this.value);
//   spanRow.innerHTML = rowsValue;
// });
// columnsSelector.addEventListener("input", function () {
//   columnsValue = parseInt(this.value);
//   spanColumn.innerHTML = columnsValue;
// });

// button.addEventListener("click", () => {
//   createRowsColumns(rowsValue, columnsValue);
// });
// resetButton.addEventListener("click", reset);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const body = document.querySelector("body");
const table = document.createElement("table");
const rowsSelector = document.querySelector("#rows");
const spanRow = document.querySelector("#spanRow");
const columnsSelector = document.querySelector("#columns");
const spanColumn = document.querySelector("#spanColumn");
const tHead = document.createElement("thead");
tHead.innerHTML = `<thead><tr><th colspan=${columns} border = "1px solid black">New Table</th></tr></thead>`;
const tBody = document.createElement("tbody");
table.appendChild(tHead);
table.appendChild(tBody);
body.appendChild(table);
const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
body.prepend(resetButton);
let rowsValue = 1;
let columnsValue = 1;
function createRowsColumns(rows, columns) {
  table.style.border = "1px solid black";
  for (let i = 1; i <= rows; i++) {
    let newTr = document.createElement("tr");
    tBody.appendChild(newTr);
    for (let j = 1; j <= columns; j++) {
      let newTD = document.createElement("td");
      newTD.style.border = "1px solid black";
      newTD.innerHTML = `Row${i} Column${j}`;
      newTr.appendChild(newTD);
    }
  }
}
function reset() {
  tHead.innerHTML = "";
  tBody.innerHTML = "";
  rowsSelector.value = 0;
  columnsSelector.value = 0;
  rowsValue = 0;
  columnsValue = 0;
  spanRow.innerHTML = 0;
  spanColumn.innerHTML = 0;
}
rowsSelector.addEventListener("input", function () {
  rowsValue = parseInt(this.value);
  tBody.innerHTML = "";
  spanRow.innerHTML = rowsValue;
  createRowsColumns(rowsValue, columnsValue);
});
columnsSelector.addEventListener("input", function () {
  columnsValue = parseInt(this.value);
  tBody.innerHTML = "";
  spanColumn.innerHTML = columnsValue;
  createRowsColumns(rowsValue, columnsValue);
});
resetButton.addEventListener("click", reset);
