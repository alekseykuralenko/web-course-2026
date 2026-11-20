const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start-btn');

const CELL_SIZE = 20;

export function drawGrid() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= canvas.width; i += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j <= canvas.height; j += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }
}
export function drawSnake(snake) {
    snake.forEach((segment, index) => {
        const x = segment.x * CELL_SIZE + CELL_SIZE / 2;
        const y = segment.y * CELL_SIZE + CELL_SIZE / 2;
        const radius = CELL_SIZE / 2 - 1;

        ctx.fillStyle = index === 0 ? '#4ade80' : '#166534';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (index === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x - 4, y - 3, 2, 0, Math.PI * 2);
            ctx.arc(x + 4, y - 3, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

export function drawApple(apple) {
    if (!apple) return;
    const x = apple.x * CELL_SIZE + CELL_SIZE / 2;
    const y = apple.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 3;

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(x, y + 1, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fca5a5';
    ctx.beginPath();
    ctx.arc(x - 3, y - 2, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#166534';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - radius + 1);
    ctx.lineTo(x + 2, y - radius - 4);
    ctx.stroke();

    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.ellipse(x + 4, y - radius - 2, 3, 1.5, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
}

export function updateScore(score) {
    scoreEl.textContent = score;
}

export function setStatus(text) {
    statusEl.textContent = text;
}

export function setStartButtonEnabled(enabled) {
    startBtn.disabled = !enabled;
}

export const elements = {
    startBtn,
    canvas
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function playEatSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);
}