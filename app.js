// js/app.js

// Navbar loading script
document.addEventListener("DOMContentLoaded", function () {
  fetch("partials/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      // Check if we're on learn.html
      const currentPage = window.location.pathname;
      if (currentPage.includes("learn.html")) {
        const backLink = document.getElementById("back-link");
        if (backLink) {
          backLink.classList.remove("hidden");
        }
      }
    });
});

const toggleWord = document.getElementById("toggle-word");
const word = document.getElementById("word");
const toggleGif = document.getElementById("toggle-gif");
const gif = document.getElementById("gif");
const toggleSound = document.getElementById("toggle-sound");
let sound = true;

toggleWord.addEventListener("change", function () {
  if (toggleWord.checked) {
    word.style.display = "block";
    //add sounds when toggled on and off//////////////////////////////
  } else {
    word.style.display = "none";
  }
});

toggleGif.addEventListener("change", function () {
  if (toggleGif.checked) {
    gif.style.display = "block";
    //add sounds when toggled on and off//////////////////////////////
  } else {
    gif.style.display = "none";
  }
});

toggleSound.addEventListener("change", function () {
  sound = !sound;
});

// list of words/gif to display
const words = {
  1: "Hi",
  2: "I love you",
  3: "Good luck",
  4: "Good Morning",
  5: "Good Bye",
  6: "Thank you",
};

const gifs = {
  1: "./images/hi.gif",
  2: "./images/iloveyou.gif",
  3: "./images/goodluck.gif",
};

// On keydown event, display a random word
document.addEventListener("keydown", function (event) {
  const keyPressed = event.key;

  if (words[keyPressed]) {
    const message = words[keyPressed];
    word.textContent = message;
    gif.src = gifs[keyPressed] || "";

    if (sound) {
      // Cancel all ongoing word
      speechSynthesis.cancel();

      // Speak the word
      const utter = new SpeechSynthesisUtterance(message);
      // 🔊 Set slower speech rate (0.5–1.0 is good)
      utter.rate = 0.6;

      speechSynthesis.speak(utter);
    }
  }
});
