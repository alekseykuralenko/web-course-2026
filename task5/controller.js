import { createInitialState, addRandomStep, handlePlayerInput } from './model.js';
import { updateLevel, setStatus, flashPad, setPadsEnabled, setStartButtonEnabled, elements } from './view.js';

let state = createInitialState();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSequence() {
    state.isShowingSequence = true;
    setPadsEnabled(false);
    setStatus('Смотри...');

    for (const color of state.sequence) {
        flashPad(color);
        await sleep(600);
    }

    state.isShowingSequence = false;
    setPadsEnabled(true);
    setStatus('Твой ход');
}

function startNewGame() {
    state = createInitialState();
    updateLevel(0);
    setStartButtonEnabled(false);
    addRandomStep(state);
    updateLevel(state.level);
    showSequence();
}

async function handlePadClick(color) {
    if (state.isShowingSequence || state.isGameOver) return;

    flashPad(color);
    const result = handlePlayerInput(state, color);

    if (!result.success) {
        state.isGameOver = true;
        setPadsEnabled(false);
        setStatus(`Игра окончена! Уровень: ${state.level}`);
        setStartButtonEnabled(true);
        return;
    }

    if (result.roundComplete) {
        setStatus('Верно! Следующий раунд...');
        setPadsEnabled(false);
        await sleep(1000);
        addRandomStep(state);
        updateLevel(state.level);
        showSequence();
    }
}

elements.startBtn.addEventListener('click', startNewGame);

elements.pads.forEach(pad => {
    pad.addEventListener('click', () => {
        handlePadClick(pad.dataset.color);
    });
});

setPadsEnabled(false);