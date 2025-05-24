import { setupUI } from '../src/js/ui.js';

describe('UI Setup', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="start-btn"></button>
            <button id="save-btn"></button>
            <select id="language-select"></select>
            <div id="output"></div>
        `;
    });

    test('setupUI should initialize event listeners', () => {
        const recognition = { start: jest.fn(), lang: 'en-US' };
        setupUI(recognition);

        const startBtn = document.getElementById('start-btn');
        startBtn.click();

        expect(recognition.start).toHaveBeenCalled();
        expect(startBtn.textContent).toBe('Listening...');
    });
});