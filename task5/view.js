const levelEl = document.getElementById('level');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const pads = document.querySelectorAll('.pad');

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