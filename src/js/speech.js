export function initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        throw new Error('Web Speech API not supported in this browser');
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = document.getElementById('language-select').value || 'en-US';

    // Error handling
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        const statusElement = document.getElementById('status-text');
        if (statusElement) {
            statusElement.textContent = `Error: ${event.error}`;
        }
    };

    return recognition;
}