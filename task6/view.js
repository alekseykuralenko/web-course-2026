const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start-btn');

const CELL_SIZE = 20;

export function drawGrid() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawSnake(snake) {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4ade80' : '#166534';
        ctx.fillRect(
            segment.x * CELL_SIZE,
            segment.y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1
        );
    });
}

export function drawApple(apple) {
    if (!apple) return;
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    ctx.arc(
        apple.x * CELL_SIZE + CELL_SIZE / 2,
        apple.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
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