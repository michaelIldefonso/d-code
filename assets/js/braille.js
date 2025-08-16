const toggleWord = document.getElementById("toggle-word");
const word = document.getElementById("word");
const toggleGif = document.getElementById("toggle-gif");
const gif = document.getElementById("gif");
const toggleSound = document.getElementById("toggle-sound");
let sound = true;

toggleWord.addEventListener("change", function () {
  word.style.display = toggleWord.checked ? "block" : "none";
});

toggleGif.addEventListener("change", function () {
  gif.style.display = toggleGif.checked ? "block" : "none";
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
  1: "/assets/images/hi.gif",
  2: "/assets/images/iloveyou.gif",
  3: "/assets/images/goodluck.gif",
  4: "/assets/images/goodmorning.gif",
  5: "/assets/images/goodbye.gif",
  6: "/assets/images/thankyou.gif",
};

// On keydown event, display a word + gif
document.addEventListener("keydown", function (event) {
  const keyPressed = event.key;

  if (words[keyPressed]) {
    const message = words[keyPressed];
    word.textContent = message;

    // Ensure gif stays responsive
    gif.src = gifs[keyPressed] || "";
    gif.classList.add(
      "w-full",
      "max-w-[300px]",
      "lg:max-w-[500px]",
      "object-contain",
      "rounded-3xl"
    );

    if (sound) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
      const utter = new SpeechSynthesisUtterance(message);
      utter.rate = 0.6; // Slow & clear speech
      speechSynthesis.speak(utter);
    }
  }
});
