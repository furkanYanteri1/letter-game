// Function to initialize speech recognition
function initializeSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        console.log('Speech Recognition not supported in this browser.');
        return null;
    }

    let recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    return recognition;
}

// Function to start speech recognition
function startSpeechRecognition(recognition) {
    if (!recognition) return;

    recognition.start();
}

// Function to handle speech recognition result
function handleRecognitionResult(e, targetLetter, spokenWordElement, successCallback, errorCallback) {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript.trim().toLowerCase();

    // Update the displayed spoken word
    spokenWordElement.innerText = text;

    // Show the word for 1 second before validation
    setTimeout(() => {
        if (text.charAt(0) === targetLetter) {
            // Display success message
            spokenWordElement.innerText = "Success! The word starts with the target letter.";
            spokenWordElement.classList.add("success");
            if (typeof successCallback === 'function') {
                successCallback();
            }
        } else {
            // Display error message
            spokenWordElement.innerText = "Error! The word does not start with the target letter.";
            spokenWordElement.classList.add("error");
            if (typeof errorCallback === 'function') {
                errorCallback();
            }
        }

        // Clear the spoken word after 2 seconds
        setTimeout(() => {
            spokenWordElement.innerText = '';
            spokenWordElement.classList.remove("success", "error");
        }, 2000); // 2 seconds

    }, 1000); // 1 second
}

// Function to stop speech recognition
function stopSpeechRecognition(recognition) {
    if (!recognition) return;

    recognition.stop();
}

// Function to handle recognition errors
function handleRecognitionError(e, spokenWordElement) {
    // Display error message
    spokenWordElement.innerText = "Recognition error: " + e.error;
    spokenWordElement.classList.add("error");

    // Clear the error message after 3 seconds
    setTimeout(() => {
        spokenWordElement.innerText = '';
        spokenWordElement.classList.remove("error");
    }, 3000); // 3 seconds
}

const targetLetterElement = document.getElementById('target-letter');
const spokenWordElement = document.getElementById('spoken-word');
const startBtn = document.getElementById('start-btn');
let targetLetter = targetLetterElement.innerText.toLowerCase();

// Initialize speech recognition
let recognition = initializeSpeechRecognition();

if (recognition) {
    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        spokenWordElement.innerText = 'Listening...';
        startSpeechRecognition(recognition);
    });

    recognition.addEventListener('result', (e) => {
        handleRecognitionResult(e, targetLetter, spokenWordElement, () => {
            spokenWordElement.innerText = "Success! The word starts with the target letter.";
            spokenWordElement.classList.add("success");
        }, () => {
            spokenWordElement.innerText = "Error! The word does not start with the target letter.";
            spokenWordElement.classList.add("error");
        });
    });

    recognition.addEventListener('end', () => {
        startBtn.disabled = false;
        stopSpeechRecognition(recognition);
    });

    recognition.addEventListener('error', (e) => {
        startBtn.disabled = false;
        handleRecognitionError(e, spokenWordElement);
    });
}
