// Генерация случайного числа из 4 уникальных цифр
export function generateSecretNumber() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let secret = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        secret += digits.splice(randomIndex, 1)[0];
    }
    return secret;
}

// Подсчет быков и коров
export function checkAttempt(secret, attempt) {
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < 4; i++) {
        if (attempt[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(attempt[i])) {
            cows++;
        }
    }
    return { bulls, cows };
}

// Валидация ввода (ровно 4 цифры, все разные)
export function isValidAttempt(attempt) {
    if (!/^\d{4}$/.test(attempt)) return false;
    const uniqueDigits = new Set(attempt.split(''));
    return uniqueDigits.size === 4;
}