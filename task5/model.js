const COLORS = ['green', 'red', 'yellow', 'blue'];

export function createInitialState() {
    return {
        sequence: [],
        playerInput: [],
        level: 0,
        isShowingSequence: false,
        isGameOver: false
    };
}

export function addRandomStep(state) {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    state.sequence.push(randomColor);
    state.level = state.sequence.length;
    state.playerInput = [];
}

export function handlePlayerInput(state, color) {
    state.playerInput.push(color);
    const currentIndex = state.playerInput.length - 1;

    if (state.playerInput[currentIndex] !== state.sequence[currentIndex]) {
        state.isGameOver = true;
        return { success: false };
    }

    if (state.playerInput.length === state.sequence.length) {
        return { success: true, roundComplete: true };
    }

    return { success: true, roundComplete: false };
}