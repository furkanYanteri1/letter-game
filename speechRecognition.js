// Function to initialize speech recognition
export function initializeSpeechRecognition() {
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
export function startSpeechRecognition(recognition) {
    if (!recognition) return;

    recognition.start();
}

// Function to handle speech recognition result
export function handleRecognitionResult(e, targetLetter, spokenWordElement, successCallback, errorCallback) {
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
export function stopSpeechRecognition(recognition) {
    if (!recognition) return;

    recognition.stop();
}

// Function to handle recognition errors
export function handleRecognitionError(e, spokenWordElement) {
    // Display error message
    spokenWordElement.innerText = "Recognition error: " + e.error;
    spokenWordElement.classList.add("error");

    // Clear the error message after 3 seconds
    setTimeout(() => {
        spokenWordElement.innerText = '';
        spokenWordElement.classList.remove("error");
    }, 3000); // 3 seconds
}
