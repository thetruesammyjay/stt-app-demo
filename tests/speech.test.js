import { initializeSpeechRecognition } from '../src/js/speech.js';

describe('Speech Recognition', () => {
    test('initializeSpeechRecognition should return a recognition object', () => {
        const recognition = initializeSpeechRecognition();
        expect(recognition).toBeDefined();
        expect(recognition.lang).toBe('en-US');
        expect(recognition.continuous).toBe(false);
        expect(recognition.interimResults).toBe(false);
    });

    test('initializeSpeechRecognition should throw an error if Web Speech API is not supported', () => {
        // Mock the absence of Web Speech API
        const originalWebkitSpeechRecognition = window.webkitSpeechRecognition;
        window.webkitSpeechRecognition = undefined;

        expect(() => initializeSpeechRecognition()).toThrow('Your browser does not support the Web Speech API.');

        // Restore the original Web Speech API
        window.webkitSpeechRecognition = originalWebkitSpeechRecognition;
    });
});