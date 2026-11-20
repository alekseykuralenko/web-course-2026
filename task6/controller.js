import { createInitialState, spawnApple, updateDirection, moveSnake } from './model.js';
import { drawGrid, drawSnake, drawApple, updateScore, setStatus, setStartButtonEnabled, elements } from './view.js';

let state = createInitialState();
let lastMoveTime = 0;
const MOVE_INTERVAL = 150; // миллисекунд между движениями
let animationId = null;

function gameLoop(currentTime) {
    if (!state.isRunning) return;

    if (currentTime - lastMoveTime >= MOVE_INTERVAL) {
        moveSnake(state);
        lastMoveTime = currentTime;

        if (state.isGameOver) {
            state.isRunning = false;
            setStatus(`Игра окончена! Счёт: ${state.score}`);
            setStartButtonEnabled(true);
            render();
            return;
        }
    }

    render();
    animationId = requestAnimationFrame(gameLoop);
}

function render() {
    drawGrid();
    drawSnake(state.snake);
    drawApple(state.apple);
    updateScore(state.score);
}

function startGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    state = createInitialState();
    spawnApple(state);
    state.isRunning = true;
    lastMoveTime = 0;
    setStatus('Игра идёт...');
    setStartButtonEnabled(false);
    render();
    animationId = requestAnimationFrame(gameLoop);
}

function handleKeydown(event) {
    if (!state.isRunning) return;

    const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
    };

    const newDirection = keyMap[event.key];
    if (newDirection) {
        event.preventDefault();
        updateDirection(state, newDirection);
    }
}

elements.startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeydown);

// Начальная отрисовка
drawGrid();
setStatus('Нажми «Старт»');