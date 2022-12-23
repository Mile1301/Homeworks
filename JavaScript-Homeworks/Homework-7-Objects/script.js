// EXERCISE 1
// Write a JavaScript function to retrieve all the values of an object's properties
const student = {
  name: "David Rayy",
  sclass: "VI",
  rollno: 12,
  retreiveValues() {
    const { name, sclass, rollno } = this;
    return `${name}, ${sclass}, ${rollno}`;
  },
  // EXERCISE 2
  // Write a JavaScript program to delete the rollno property from the following object. Also print the object before or after deleting the property.
  deleteValues() {
    // const { rollno } = this; - ne znam zosto neke vaka koga go destruktuirav this. Guglav ama bez da najdam resenie
    // delete rollno;
    delete this.rollno;
  },
};
console.log("Before deletion", student);
const printStudent = student.retreiveValues();
const deleteProperty = student.deleteValues();
console.log("Retreived values:", printStudent);
console.log("After deletion", student);

// EXERCISE 3
// Write a JavaScript function to check if an object contains given property

// PLEASE COMMENT OUT THE EXERCISE TO GET IT GOING

// function isConatainedProperty(object, propertyName) {
//   return object.hasOwnProperty(propertyName);
// }
// let inputProperty = prompt(
//   "Enter a property name to see if it is in this object:"
// );
// const printIsContainedProperty = isConatainedProperty(student, inputProperty);
// console.log(
//   `The property ${inputProperty.toUpperCase()} ${
//     printIsContainedProperty === true ? "is" : "isn't"
//   } contained in the object`,
//   student
// );

// EXERCISE 4
// Create a car object with some properties
// model, color, year, fuel, fuelConsumption and a method that calculate how much fuel you will need to pass some distance.

function Car(model, color, year, fuel, fuelConsumption) {
  this.model = model;
  this.color = color;
  this.year = year;
  this.fuel = fuel;
  this.fuelConsumption = fuelConsumption;
}
Car.prototype.calculateDistance = function () {
  const { fuel, fuelConsumption } = this;
  let per100Km = (fuel / fuelConsumption) * 100;
  return `With ${fuel}L and average consumption of ${fuelConsumption}L per 100 km, you can pass approximatelly ${per100Km} kilometers`;
};

const ferrari = new Car("laferrari", "Nero", 2013, 100, 20);

console.log(ferrari);
console.log(ferrari.calculateDistance());
