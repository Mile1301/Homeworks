const tweetForm = document.querySelector("#tweetForm");
const tweetsContainer = document.querySelector("#tweets");
tweetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = tweetForm.elements.username;
  const tweet = tweetForm.elements.tweet;
  if (validateEmail(username.value)) {
    addTweet(username.value, tweet.value);
    tweetForm.classList.add("green");
  } else {
    tweetForm.classList.add("red");
    alert("Not a valid e-mail");
  }
  setTimeout(() => {
    tweetForm.classList.remove("green", "red");
    username.value = "";
    tweet.value = "";
  }, 1000);
});
function addTweet(username, tweet) {
  const newTweet = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(`-${tweet}`);
  tweetsContainer.append(newTweet);
}
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/; //ovoj regex go najdov na internet, uste ne im ja razbiram sintaksata
  return re.test(email);
}
tweetsContainer.addEventListener("click", function (e) {
  console.log(e);
  e.target.nodeName === "LI" && e.target.remove();
});
