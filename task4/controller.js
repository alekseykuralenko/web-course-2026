import { generateSecretNumber, checkAttempt, isValidAttempt } from './model.js';
import { renderHistory, showMessage, clearMessage, getAttemptValue, clearInput, setAttemptsCount, disableGame, elements } from './view.js';

// Состояние игры (инкапсулировано в модуле, не засоряет глобальную область)
let state = {
    secret: '',
    history: [],
    attempts: 0,
    isGameOver: false
};

function initGame() {
    state.secret = generateSecretNumber();
    state.history = [];
    state.attempts = 0;
    state.isGameOver = false;
    
    renderHistory(state.history);
    clearMessage();
    clearInput();
    setAttemptsCount(0);
    disableGame(false);
    
    // Подсказка для проверки преподавателем (можно удалить перед сдачей)
    console.log('Для тестирования, загаданное число:', state.secret); 
}

function handleAttempt() {
    if (state.isGameOver) return;

    const attempt = getAttemptValue();
    clearMessage();

    if (!isValidAttempt(attempt)) {
        showMessage('Введите ровно 4 разные цифры!', true);
        return;
    }

    if (state.history.some(h => h.attempt === attempt)) {
        showMessage('Вы уже вводили это число!', true);
        return;
    }

    state.attempts++;
    const result = checkAttempt(state.secret, attempt);
    
    state.history.push({ attempt, ...result });
    
    renderHistory(state.history);
    setAttemptsCount(state.attempts);
    clearInput();

    if (result.bulls === 4) {
        state.isGameOver = true;
        showMessage(`Поздравляем! Вы угадали число ${state.secret} за ${state.attempts} попыток!`, false);
        disableGame(true);
    }
}

function handleRestart() {
    initGame();
}

// Инициализация событий (Controller связывает View и Model)
elements.submitBtn.addEventListener('click', handleAttempt);
elements.attemptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAttempt();
});
elements.restartBtn.addEventListener('click', handleRestart);

// Запуск при загрузке
initGame();