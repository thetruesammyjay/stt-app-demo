export function formatTranscript(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function playAudioFeedback(type) {
    const audio = new Audio();
    audio.src = type === 'start' ? 
        '/assets/sounds/start.mp3' : 
        '/assets/sounds/stop.mp3';
    audio.play().catch(e => console.warn('Audio playback failed:', e));
}