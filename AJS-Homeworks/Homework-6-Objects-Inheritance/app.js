function Academy(name, students, subjects, start, end) {
  this.name = name === undefined ? "SEDC" : name;
  this.students = students;
  this.subjects = subjects;
  this.start = start === undefined ? "10-17-2022" : start;
  this.end = end === undefined ? "10-16-2023" : end;
  this.numberOfClasses = this.subjects.length * 10;
  this.printStudents = function () {
    if (this.students.length === 0) console.log("No students assigned yet!");
    for (let student of this.students) {
      console.log(student);
    }
  };
  this.printSubjects = function () {
    for (let subject of this.subjects) {
      console.log(subject);
    }
  };
}

function Subject(title, isElective, students) {
  this.title = title;
  this.numberOfClasses = 10;
  this.isElective = isElective;
  this.academies = [];
  this.addAcademy = function (academyInput) {
    this.students = students;
    this.academies.push(academyInput);
  };
  this.overrideClasses = function (num) {
    if (num <= 3) return (this.numberOfClasses = 10);
    return (this.numberOfClasses = num);
  };
}

function Student(firstName, lastName, age) {
  this.firstName = firstName === undefined ? "M" : firstName;
  this.lastName = lastName === undefined ? "T" : lastName;
  this.age = age === undefined ? 18 : age;
  this.academy = null;
  this.currentSubject = [];
  this.completedSubjects = [];
  this.startSubject = function (subject) {
    if (!subject) {
      console.log("Please add a starting subject");
      return;
    }
    if (subject) {
      this.currentSubject.push(subject);
      if (this.currentSubject.length > 1) {
        this.completedSubjects.push(this.currentSubject[1]);
        this.currentSubject.pop();
      }
    }
  };
  this.startAcademy = function (academyInput) {
    return (this.academy = academyInput);
  };
}

function studentElementsInput(studentFirstName, studentLastName, studentAge, subjectTitle, subjectElective, academyName, academyStart, academyEnd) {
  let student = new Student(studentFirstName, studentLastName, studentAge);
  let subject = new Subject(subjectTitle, subjectElective, [student]);
  let academy = new Academy(academyName, [student], [subject], academyStart, academyEnd);
  subject.addAcademy(academy); //adds Academy property on subjects and Students property on Subject
  student.startSubject(subject); //adds current Subject on Student and if there are more than one current subjects it moves the last current in completed subjects
  student.startAcademy(academy); //adds Academy property on students
  console.log(`The total number of classes on this Academy is: ${academy.numberOfClasses}`);
  //   academy.printStudents(); //works fine
  //   academy.printSubjects(); //works fine
  //   subject.overrideClasses(12); //works fine
  console.log(academy);
  console.log(subject);
  console.log(student);
}
studentElementsInput("Mile", "Todorovski", 39, "html", false, "SEDC", "09-2022", "09-2023");
// studentElementsInput("Petko", "Petkovski", 29, "html", false, "SEDC", "09-2022", "09-2023");
