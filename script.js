import * as SpeechRecognition from './speechrecognition.js';

const targetLetterElement = document.getElementById('target-letter');
const spokenWordElement = document.getElementById('spoken-word');
const startBtn = document.getElementById('start-btn');
let targetLetter = targetLetterElement.innerText.toLowerCase();

// Initialize speech recognition
let recognition = SpeechRecognition.initializeSpeechRecognition();

if (recognition) {
    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        spokenWordElement.innerText = 'Listening...';
        SpeechRecognition.startSpeechRecognition(recognition);
    });

    recognition.addEventListener('result', (e) => {
        SpeechRecognition.handleRecognitionResult(e, targetLetter, spokenWordElement, () => {
            // Success
        }, () => {
            // Failure
        });
    });

    recognition.addEventListener('end', () => {
        startBtn.disabled = false;
        SpeechRecognition.stopSpeechRecognition(recognition);
    });

    recognition.addEventListener('error', (e) => {
        startBtn.disabled = false;
        SpeechRecognition.handleRecognitionError(e, spokenWordElement);
    });
}
