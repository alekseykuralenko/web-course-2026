const levelEl = document.getElementById('level');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const pads = document.querySelectorAll('.pad');

// Web Audio API для генерации звуков
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const FREQUENCIES = {
    green: 261.63,
    red: 329.63,
    yellow: 392.00,
    blue: 523.25,
    error: 150.00
};

export function playTone(color) {
    const frequency = FREQUENCIES[color] || FREQUENCIES.error;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

export function updateLevel(level) {
    levelEl.textContent = level;
}

export function setStatus(text) {
    statusEl.textContent = text;
}

export function flashPad(color) {
    const pad = document.querySelector(`.pad.${color}`);
    if (!pad) return;
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 400);
}

export function setPadsEnabled(enabled) {
    pads.forEach(pad => {
        pad.disabled = !enabled;
    });
}

export function setStartButtonEnabled(enabled) {
    startBtn.disabled = !enabled;
}

export const elements = {
    startBtn,
    pads
};