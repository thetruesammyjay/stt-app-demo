import { initializeSpeechRecognition } from './speech.js';
import { setupUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        const recognition = initializeSpeechRecognition();
        setupUI(recognition);
    } catch (error) {
        console.error('App initialization failed:', error);
        document.getElementById('status-text').textContent = 'Error: ' + error.message;
    }
});