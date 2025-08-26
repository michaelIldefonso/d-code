
// Keyboard/Braille page logic moved from keyb.html
document.addEventListener("DOMContentLoaded", function () {
	const wordDisplay = document.getElementById("word");
	const inputBox = document.getElementById("ai-input");
	const toggleWord = document.getElementById("toggle-word");
	const toggleGif = document.getElementById("toggle-gif");
	const gif = document.getElementById("gif");
	const toggleSound = document.getElementById("toggle-sound");

	let sound = true;
	let currentInput = "";
	let displayMode = "char"; // 'char' or 'sentence'

	// Only allow letters/spaces and show latest character
	inputBox.addEventListener("input", (e) => {
		let val = e.target.value;
		val = val.replace(/[^a-zA-Z ]/g, ""); // strip invalid chars
		e.target.value = val;

		currentInput = val;
		displayMode = "char";

		// Show only the latest letter image when typing
		const letterImages = document.getElementById("letter-images");
		if (letterImages) {
			letterImages.style.display = "flex";
			letterImages.innerHTML = "";
			if (val.length > 0) {
				const ch = val[val.length - 1].toLowerCase();
				if (ch >= 'a' && ch <= 'z') {
					const img = document.createElement('img');
					const ext = (ch === 'j' || ch === 'z') ? 'gif' : 'png';
					img.src = `/assets/images/letters/${ch}.${ext}`;
					img.alt = ch;
					img.className = "w-64 h-64 object-contain rounded-md border border-gray-300";
					letterImages.appendChild(img);
				} else if (ch === ' ') {
					// Add a spacer for spaces
					const spacer = document.createElement('span');
					spacer.style.display = 'inline-block';
					spacer.style.width = '16px';
					letterImages.appendChild(spacer);
				}
			}
		}

		if (val.length > 0) {
			wordDisplay.textContent = val[val.length - 1]; // last character
		} else {
			wordDisplay.textContent = "";
			if (letterImages) letterImages.innerHTML = "";
		}
	});

	// On Enter -> show full sentence (do not clear textarea)
	inputBox.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault(); // prevent newline in textarea
			const inputSentence = inputBox.value.trim();
			const letterImages = document.getElementById("letter-images");
			if (inputSentence.length > 0) {
				displayMode = "sentence";
				currentInput = inputSentence;
				wordDisplay.textContent = currentInput;
				// Hide letter images when showing sentence
				if (letterImages) {
					letterImages.style.display = "none";
					letterImages.innerHTML = "";
				}

				if (sound) {
					speechSynthesis.cancel();
					const utter = new SpeechSynthesisUtterance(currentInput);
					utter.rate = 1.0;
					speechSynthesis.speak(utter);
				}
			} else {
				wordDisplay.textContent = "Type something!";
				setTimeout(() => {
					wordDisplay.textContent = "";
				}, 1000);
			}
		}
	});


	// Helper function to speak a message
	function speakMessage(message) {
		speechSynthesis.cancel();
		const utter = new SpeechSynthesisUtterance(message);
		utter.rate = 1.0;
		speechSynthesis.speak(utter);
	}

	// Toggle word visibility
	toggleWord.addEventListener("change", (e) => {
		if (!e.target.checked) {
			wordDisplay.textContent = "";
			speakMessage("words off");
		} else {
			if (displayMode === "sentence" && currentInput.trim().length > 0) {
				wordDisplay.textContent = currentInput;
			} else if (inputBox.value.length > 0) {
				wordDisplay.textContent = inputBox.value[inputBox.value.length - 1];
			} else {
				wordDisplay.textContent = "";
			}
			speakMessage("words on");
		}
	});

	// Toggle GIF (photo) visibility
	toggleGif.addEventListener("change", function () {
		gif.style.display = toggleGif.checked ? "block" : "none";
		if (toggleGif.checked) {
			speakMessage("gestures on");
		} else {
			speakMessage("gestures off");
		}
	});

	// Toggle sound
	toggleSound.addEventListener("change", function () {
		sound = !sound;
		if (sound) {
			speakMessage("sounds on");
		} else {
			speakMessage("sounds off");
		}
	});
});
