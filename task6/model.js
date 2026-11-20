const GRID_SIZE = 20;
const CELL_SIZE = 20;

export function createInitialState() {
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    return {
        snake: [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ],
        direction: { x: 1, y: 0 },
        nextDirection: { x: 1, y: 0 },
        apple: null,
        score: 0,
        isGameOver: false,
        isRunning: false
    };
}

export function spawnApple(state) {
    let apple;
    do {
        apple = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (state.snake.some(segment => segment.x === apple.x && segment.y === apple.y));
    state.apple = apple;
}

export function updateDirection(state, newDirection) {
    // Запрет разворота на 180°
    const isOpposite =
        newDirection.x === -state.direction.x &&
        newDirection.y === -state.direction.y;
    if (!isOpposite) {
        state.nextDirection = newDirection;
    }
}

export function moveSnake(state) {
    state.direction = { ...state.nextDirection };
    const head = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y
    };

    // Столкновение со стеной
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        state.isGameOver = true;
        return;
    }

    // Столкновение с собой
    if (state.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        state.isGameOver = true;
        return;
    }

    state.snake.unshift(head);

    // Съели яблоко?
    if (head.x === state.apple.x && head.y === state.apple.y) {
        state.score++;
        spawnApple(state);
    } else {
        state.snake.pop();
    }
}