const historyListEl = document.getElementById('history-list');
const messageEl = document.getElementById('message');
const attemptInput = document.getElementById('attempt-input');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const attemptsCountEl = document.getElementById('attempts-count');

export function renderHistory(history) {
    historyListEl.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.attempt} → ${item.bulls} бык., ${item.cows} кор.`;
        historyListEl.appendChild(li);
    });
}

export function showMessage(text, isError = false) {
    messageEl.textContent = text;
    messageEl.style.color = isError ? '#f87171' : '#4ade80'; // Светло-красный или светло-зеленый
}

export function clearMessage() {
    messageEl.textContent = '';
}

export function getAttemptValue() {
    return attemptInput.value.trim();
}

export function clearInput() {
    attemptInput.value = '';
    attemptInput.focus();
}

export function setAttemptsCount(count) {
    attemptsCountEl.textContent = count;
}

export function disableGame(disabled) {
    attemptInput.disabled = disabled;
    submitBtn.disabled = disabled;
    attemptInput.style.opacity = disabled ? '0.5' : '1';
    submitBtn.style.opacity = disabled ? '0.5' : '1';
}

// Экспорт элементов для навешивания событий в контроллере
export const elements = {
    submitBtn,
    restartBtn,
    attemptInput
};