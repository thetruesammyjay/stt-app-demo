export function setupUI(recognition) {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const saveBtn = document.getElementById('save-btn');
    const languageSelect = document.getElementById('language-select');
    const transcriptionText = document.getElementById('transcription-text');
    const statusText = document.getElementById('status-text');
    const statusIndicator = document.getElementById('status-indicator');

    let finalTranscript = '';

    // Event Handlers
    recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        transcriptionText.innerHTML = finalTranscript + 
            '<span style="color:#999">' + interimTranscript + '</span>';
        
        saveBtn.disabled = finalTranscript.trim().length === 0;
    };

    recognition.onstart = () => {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
        statusText.textContent = 'Listening... Speak now';
        statusIndicator.innerHTML = '<i class="fas fa-circle recording"></i> Listening';
        transcriptionText.textContent = '';
        finalTranscript = '';
    };

    recognition.onend = () => {
        if (recognition.isRecording) {
            recognition.start(); // Continue listening
        }
    };

    // Button Event Listeners
    startBtn.addEventListener('click', () => {
        recognition.lang = languageSelect.value;
        recognition.isRecording = true;
        recognition.start();
    });

    stopBtn.addEventListener('click', () => {
        recognition.isRecording = false;
        recognition.stop();
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        statusText.textContent = 'Ready to continue';
        statusIndicator.innerHTML = '<i class="fas fa-info-circle"></i> Ready';
    });

    saveBtn.addEventListener('click', () => {
        if (finalTranscript.trim().length > 0) {
            const blob = new Blob([finalTranscript], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'transcript.txt';
            a.click();
            URL.revokeObjectURL(url);
        }
    });

    languageSelect.addEventListener('change', () => {
        recognition.lang = languageSelect.value;
    });
}