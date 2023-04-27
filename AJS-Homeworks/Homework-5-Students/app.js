const BASE_URL = "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";
const renderStudentsTableBody = document.querySelector(".renderStudentsTableBody");
const filterSelect = document.querySelector("#filterSelect");
const randomResults = document.querySelector(".randomResults");
const averageHeader = document.querySelector(".avgGradeHeader");
const idHeader = document.querySelector(".idHeader");
randomResults.classList.add("randomResultsNone");
let requiredFilter = "";
const getStudentsData = async () => {
  const response = await fetch(BASE_URL);
  const result = await response.json();
  console.log(result);
  const avgGradeHT3 = result.filter((el) => el.averageGrade > 3);
  const femaleAvgGradeHT5 = result.filter((el) => el.gender === "Female" && el.averageGrade === 5);
  const maleStudentCityOver18 = result.filter((el) => el.city === "Skopje" && el.age > 18);
  const femaleOver24AvgGrades = result.filter((el) => el.gender === "Female" && el.age > 24);
  const maleNameStartBAvgGradeMT2 = result.filter((el) => el.gender === "Male" && el.firstName.indexOf("B") === 0 && el.averageGrade > 2);
  if (requiredFilter === "avgGradeGT3") renderStudentsData(avgGradeHT3);
  if (requiredFilter === "femaleAvgGradeHT5") renderStudentsData(femaleAvgGradeHT5);
  //   if (requiredFilter === "maleStudentCityOver18") renderStudentsData(maleStudentCityOver18);
  if (requiredFilter === "maleStudentCityOver18") {
    renderStudentsData(maleStudentCityOver18);
    idHeader.classList.add("headerOn");
    const headerSpan = document.createElement("span");
    headerSpan.innerText = "Click here for results";
    headerSpan.classList.add("spanClass");
    idHeader.appendChild(headerSpan);
    idHeader.addEventListener("click", function () {
      randomResults.classList.remove("randomResultsNone");
      renderMaleStudentCityOver18(maleStudentCityOver18);
      renderStudentsTableBody.innerHTML = "";
      idHeader.classList.remove("headerOn");
      headerSpan.remove();
    });
  }
  //   if (requiredFilter === "femaleOver24AvgGrades") renderStudentsData(femaleOver24AvgGrades);
  if (requiredFilter === "femaleOver24AvgGrades") {
    renderStudentsData(femaleOver24AvgGrades);
    averageHeader.classList.add("headerOn");
    const headerSpan = document.createElement("span");
    headerSpan.innerText = "Click here for results";
    headerSpan.classList.add("spanClass");
    averageHeader.appendChild(headerSpan);
    averageHeader.addEventListener("click", function () {
      randomResults.classList.remove("randomResultsNone");
      renderFemaleOver24AvgGrades(femaleOver24AvgGrades);
      renderStudentsTableBody.innerHTML = "";
      averageHeader.classList.remove("headerOn");
      headerSpan.remove();
    });
  }
  if (requiredFilter === "maleNameStartBAvgGradeMT2") renderStudentsData(maleNameStartBAvgGradeMT2);
};

const renderStudentsData = (students) => {
  renderStudentsTableBody.innerHTML = "";
  for (let student of students) {
    const studentRow = document.createElement("tr");
    studentRow.innerHTML = `
    <td class="name"><strong>${student.id}</strong></td>
    <td class="name"><strong>${student.firstName}</strong></td>
    <td class="surname"><strong>${student.lastName}</strong></td>
    <td class="gender"><strong>${student.gender}</strong></td>
    <td class="age"><strong>${student.age}</strong></td>
    <td class="city"><strong>${student.city}</strong></td>
    <td class="avgGrade"><strong>${student.averageGrade}</strong></td>`;
    renderStudentsTableBody.append(studentRow);
  }
};
const renderFemaleOver24AvgGrades = (studentGrades) => {
  const studentGradesArray = [];
  randomResults.innerHTML = "";
  for (let student of studentGrades) {
    studentGradesArray.push(student.averageGrade);
    randomResults.innerHTML = `The average grades of the female students aged over 24 are: ${studentGradesArray}`;
  }
};
const renderMaleStudentCityOver18 = (studentFullNames) => {
  const studentNamesArray = [];
  randomResults.innerHTML = "";
  for (let student of studentFullNames) {
    studentNamesArray.push(`${student.firstName} ${student.lastName}`);
    randomResults.innerHTML = `The full names of the male students aged over 18 living in the City of Skopje are: ${studentNamesArray}`;
  }
};
filterSelect.addEventListener("change", function () {
  requiredFilter = this.value;
  averageHeader.classList.remove("headerOn");
  idHeader.classList.remove("headerOn");
  averageHeader.innerHTML = "Average Grade";
  idHeader.innerHTML = "Student ID";
  randomResults.classList.add("randomResultsNone");
  randomResults.innerHTML = "";
  getStudentsData();
});
