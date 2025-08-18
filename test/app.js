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
let sentence = [];

// Only allow letters, show each letter as typed, and update monitor text (img alt)
inputBox.addEventListener('input', (e) => {
  let val = e.target.value;
  // Allow a-z and spaces, ignore numbers and other symbols
  val = val.replace(/[^a-zA-Z ]/g, '');
  e.target.value = val;
  currentInput = val;
  if (!showWord) {
    // Show each letter as typed
    wordDisplay.textContent = val.split('').join(' ');
    // Show the last character as text on the monitor (img alt text)
    if (val.length > 0) {
      gif.alt = val[val.length - 1];
    } else {
      gif.alt = '';
    }
  }
});

// Reveal supported words only when Enter is pressed and input matches
const supportedWords = ['hello', 'yes', 'no', 'sorry', 'hungry', 'good'];
inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const inputWord = currentInput.toLowerCase();
    if (supportedWords.includes(inputWord)) {
      showWord = true;
      sentence.push(inputWord);
      const fullSentence = sentence.join(' ');
      wordDisplay.textContent = fullSentence;
      gif.alt = fullSentence;
      // Speech synthesis for the full sentence
      if (sound) {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(fullSentence);
        utter.rate = 0.8;
        speechSynthesis.speak(utter);
      }
      // Clear input for next word
      inputBox.value = '';
      currentInput = '';
    } else {
      wordDisplay.textContent = 'Try again!';
      setTimeout(() => {
        wordDisplay.textContent = sentence.length > 0 ? sentence.join(' ') : currentInput.split('').join(' ');
        // Show last letter again as text
        if (currentInput.length > 0) {
          gif.alt = currentInput[currentInput.length - 1];
        } else {
          gif.alt = sentence.length > 0 ? sentence.join(' ') : '';
        }   
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
