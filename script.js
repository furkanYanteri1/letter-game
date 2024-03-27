import {
    initializeSpeechRecognition,
    startSpeechRecognition,
    handleRecognitionResult,
    stopSpeechRecognition,
    handleRecognitionError
} from './speechRecognition.js';

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
