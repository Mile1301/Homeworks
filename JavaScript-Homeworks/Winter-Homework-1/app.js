let topicInput = "";
function startGame() {
  topicInput = Number(
    prompt(`Choose your topic:
    1.Movies
    2.TV Shows
    3.English football teams`)
  );
  if (
    Number.isNaN(topicInput) ||
    typeof topicInput !== "number" ||
    !topicInput ||
    topicInput > Object.keys(seed).length
  ) {
    startGame();
  }
}
const seedHelpers =
  '{"movies":["Harry-Potter", "Lord-of-the-rings", "The-Godfather","Pulp-Fiction", "Forrest-Gump", "Fight-Club"], "shows":["The Simpsons", "The Sopranos","Ghosts", "Family Guy","Two And A Half Men", "Anger Management"], "englishFootballTeams":["Manchester United", "Chelsea", "Arsenal", "Newcastle", "Manchester City", "Liverpool"]}';

let seed = JSON.parse(seedHelpers);

startGame();
const categoryDisplay = document.querySelector(".category");
const rendered = document.querySelector(".rendered");
const section = document.querySelector(".grid");
const hintButton = document.querySelector(".hint");
const clueSpan = document.querySelector(".clue");
const playButton = document.querySelector(".play");
const livesSpan = document.querySelector(".lives");
const scaffold1 = document.querySelector("#scaffold_part1");
const scaffold2 = document.querySelector("#scaffold_part2");
const scaffold3 = document.querySelector("#scaffold_part3");
const scaffold4 = document.querySelector("#scaffold_part4");
const scaffold5 = document.querySelector("#scaffold_part5");
const scaffold6 = document.querySelector("#scaffold_part6");

let randomWord = "";
const sample = (array) => array[Math.floor(Math.random() * array.length)];
let objectIndex = Object.keys(seed)[topicInput - 1];

function replaceLettersWithDashes(word) {
  return word.replace(/[a-z]/gi, `_`);
}
if (topicInput) {
  randomWord = `${sample(seed[objectIndex]).toLowerCase()}`;
  rendered.textContent = replaceLettersWithDashes(randomWord);
  categoryDisplay.textContent = objectIndex.toUpperCase();
}

String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }
  //   return this.substring(0, index) + replacement + this.substring(index + 1);
  let chars = this.split("");
  chars[index] = replacement;
  return chars.join("");
};

let str = rendered.textContent;

let guessedLetter = "";

section.addEventListener("click", function (e) {
  guessedLetter = e.target.textContent;
  let firstIndex = randomWord.indexOf(guessedLetter);
  let secondIndex = randomWord.indexOf(guessedLetter, firstIndex + 1);
  if (e.target.nodeName === "ARTICLE") {
    if (randomWord.indexOf(guessedLetter) !== -1) {
      str = str.replaceAt(firstIndex, guessedLetter);
      str = str.replaceAt(secondIndex, guessedLetter);
      str = str.replaceAt(randomWord.lastIndexOf(guessedLetter), guessedLetter);
      rendered.textContent = str;
    }
    play();
  }
});

window.addEventListener("keydown", (e) => {
  guessedLetter = e.key;
  firstIndex = randomWord.indexOf(guessedLetter);
  secondIndex = randomWord.indexOf(guessedLetter, firstIndex + 1);
  if (randomWord.indexOf(guessedLetter) !== -1) {
    str = str.replaceAt(firstIndex, guessedLetter);
    str = str.replaceAt(secondIndex, guessedLetter);
    str = str.replaceAt(randomWord.lastIndexOf(guessedLetter), guessedLetter);
    rendered.textContent = str;
  }
  if (!/^[a-zA-Z]$/.test(guessedLetter)) {
    alert("Please press a valid letter");
  }
  play();
});

hintButton.addEventListener(
  "click",
  () =>
    (clueSpan.textContent =
      randomWord[Math.floor(Math.random() * randomWord.length)]),
  { once: true }
);
playButton.addEventListener("click", () => window.location.reload());
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let totalLives = 6;
let attempts = 0;
let isGameOn = true;
function play() {
  if (isGameOn) {
    if (
      randomWord.indexOf(guessedLetter) === -1 &&
      /^[a-zA-Z]$/.test(guessedLetter)
    ) {
      attempts++;
      if (attempts === 1) scaffold1.classList.add("scaffold__head1");
      if (attempts === 2) scaffold2.classList.add("scaffold__head2");
      if (attempts === 3) scaffold3.classList.add("scaffold__head3");
      if (attempts === 4) scaffold4.classList.add("scaffold__head4");
      if (attempts === 5) scaffold5.classList.add("scaffold__head5");
      if (attempts === 6) scaffold6.classList.add("scaffold__head6");
      if (attempts === totalLives) {
        isGameOn = false;
        alert(
          `You got hanged. The word you were supposed to guess was ${randomWord}`
        );
      }
    }
    if (randomWord === rendered.textContent) {
      isGameOn = false;
      alert(`Great job!!! You guessed the word ${randomWord}`);
    }
  }
  livesSpan.textContent = totalLives - attempts;
}
