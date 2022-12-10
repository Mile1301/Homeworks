let inputYear = Number(
  prompt(
    "Enter birthyear to calculate which Chinese Zodiac a given year is in:"
  )
);
let convertedYear = (inputYear - 4) % 12;
// switch (convertedYear) {
//   case 0:
//     console.log(`The person born in ${inputYear} is a Rat`);
//     break;
//   case 1:
//     console.log(`The person born in ${inputYear} is an Ox`);
//     break;
//   case 2:
//     console.log(`The person born in ${inputYear} is a Tiger`);
//     break;
//   case 3:
//     console.log(`The person born in ${inputYear} is a Rabbit`);
//     break;
//   case 4:
//     console.log(`The person born in ${inputYear} is a Dragon`);
//     break;
//   case 5:
//     console.log(`The person born in ${inputYear} is a Snake`);
//     break;
//   case 6:
//     console.log(`The person born in ${inputYear} is a Horse`);
//     break;
//   case 7:
//     console.log(`The person born in ${inputYear} is a Goat`);
//     break;
//   case 8:
//     console.log(`The person born in ${inputYear} is a Monkey`);
//     break;
//   case 9:
//     console.log(`The person born in ${inputYear} is a Rooster`);
//     break;
//   case 10:
//     console.log(`The person born in ${inputYear} is a Dog`);
//     break;
//   case 11:
//     console.log(`The person born in ${inputYear} is a Pig`);
//     break;
// }
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// First I made it using the Switch statement because for me it seemed more convinient to use it but I also made it using the
// if/else statement.
// It works bothways

if (convertedYear === 0) {
  console.log(`The person born in ${inputYear} is a Rat`);
} else if (convertedYear === 1) {
  console.log(`The person born in ${inputYear} is an Ox`);
} else if (convertedYear === 2) {
  console.log(`The person born in ${inputYear} is a Tiger`);
} else if (convertedYear === 3) {
  console.log(`The person born in ${inputYear} is a Rabbit`);
} else if (convertedYear === 4) {
  console.log(`The person born in ${inputYear} is a Dragon`);
} else if (convertedYear === 5) {
  console.log(`The person born in ${inputYear} is a Snake`);
} else if (convertedYear === 6) {
  console.log(`The person born in ${inputYear} is a Horse`);
} else if (convertedYear === 7) {
  console.log(`The person born in ${inputYear} is a Goat`);
} else if (convertedYear === 8) {
  console.log(`The person born in ${inputYear} is a Monkey`);
} else if (convertedYear === 9) {
  console.log(`The person born in ${inputYear} is a Rooster`);
} else if (convertedYear === 10) {
  console.log(`The person born in ${inputYear} is a Dog`);
} else if (convertedYear === 11) {
  console.log(`The person born in ${inputYear} is a Pig`);
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// If we put the signs into an array  we can have the short code below

// const zodiacSigns = [
//   "Rat",
//   "Ox",
//   "Tiger",
//   "Rabbit",
//   "Dragon",
//   "Snake",
//   "Horse",
//   "Goat",
//   "Monkey",
//   "Rooster",
//   "Dog",
//   "Pig",
// ];

// let newSign = null;
// newSign = zodiacSigns[convertedYear];

// console.log(
//     `The person born in ${inputYear} is ${
//       newSign === "Ox" ? "an" : "a"
//     } ${newSign}`
//   );
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// If we put the signs into an object with the possible value as a key and the actual sign as a value we can have the short code below.
// Also I made a function to show A or AN in front of the sign, depending if the sign as a word is a vowel or consonant.
// Then i called it in the console.
// To show that it works, I put A, E, I and U in front of some signs. The leeter 'O' is the starting letter in the word Ox.

// const zodiacSignsObject = {
//   0: "ARat",
//   1: "Ox",
//   2: "Tiger",
//   3: "Rabbit",
//   4: "Dragon",
//   5: "Snake",
//   6: "Horse",
//   7: "Goat",
//   8: "IMonkey",
//   9: "ERooster",
//   10: "UDog",
//   11: "Pig",
// };

// function aOrAn() {
//   if (newSign.indexOf("A") === 0) {
//     return "an";
//   }
//   if (newSign.indexOf("E") === 0) {
//     return "an";
//   }
//   if (newSign.indexOf("I") === 0) {
//     return "an";
//   }
//   if (newSign.indexOf("O") === 0) {
//     return "an";
//   }
//   if (newSign.indexOf("U") === 0) {
//     return "an";
//   } else {
//     return "a";
//   }
// }
// let newSign = null;
// let newSignFromObject = Object.values(zodiacSignsObject);
// newSign = newSignFromObject[convertedYear];
// console.log(`The person born in ${inputYear} is ${aOrAn()} ${newSign}`);
