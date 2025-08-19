// Rule-based AI for typing 'hello' letter by letter
// Shows each letter on the monitor image as user types, only reveals 'hello' when Enter is pressed

const wordDisplay = document.getElementById('word');
const inputBox = document.getElementById('ai-input');
const toggleWord = document.getElementById('toggle-word');
const toggleGif = document.getElementById('toggle-gif');
const gif = document.getElementById('gif');
const toggleSound = document.getElementById('toggle-sound');
let sound = true;

let currentInput = '';
let showWord = false;

// Only allow letters, show each letter as typed, and update monitor text (img alt)
inputBox.addEventListener('input', (e) => {
  let val = e.target.value;
  // Allow a-z and spaces, ignore numbers and other symbols
  val = val.replace(/[^a-zA-Z ]/g, '');
  e.target.value = val;
  currentInput = val;
  // Show the text exactly as typed (no extra spaces between letters)
  wordDisplay.textContent = val;
  // Show the last character as text on the monitor (img alt text)
  if (val.length > 0) {
    gif.alt = val[val.length - 1];
  } else {
    gif.alt = '';
  }
});

// On Enter, speak the current sentence (if not empty)
inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const inputSentence = inputBox.value.trim();
    if (inputSentence.length > 0) {
      showWord = true;
      wordDisplay.textContent = inputSentence;
      gif.alt = inputSentence;
      // Speech synthesis for the full sentence
      if (sound) {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(inputSentence);
        utter.rate = 1.0;
        speechSynthesis.speak(utter);
      }
    } else {
      wordDisplay.textContent = 'Type something!';
      setTimeout(() => {
        wordDisplay.textContent = '';
        gif.alt = '';
      }, 1000);
    }
  }
});

// Toggle for showing/hiding the word
toggleWord.addEventListener('change', (e) => {
  if (!e.target.checked) {
    wordDisplay.textContent = '';
  } else {
    if (showWord) {
      wordDisplay.textContent = 'hello';
    } else {
      wordDisplay.textContent = currentInput.split('').join(' ');
    }
  }
});

toggleGif.addEventListener('change', function () {
  gif.style.display = toggleGif.checked ? 'block' : 'none';
});

toggleSound.addEventListener('change', function () {
  sound = !sound;
});
