let numberToGuess = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let currentGameHistory = [];
let allGamesHistory = [];

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attemptsList = document.getElementById('attemptsList');
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Пожалуйста, введите число от 1 до 100.  ';
        return;
    }

    attempts += 1;

    let attemptMessage = `Попытка ${attempts}: ${userGuess}`;
    if (userGuess < numberToGuess) {
        attemptMessage += ' - Загаданное число больше.';
    } else if (userGuess > numberToGuess) {
        attemptMessage += ' - Загаданное число меньше.';
    } else {
        attemptMessage += ` - Поздравляем! Вы угадали число ${numberToGuess} за ${attempts} попыток.`;
        addAttempt(attemptMessage);
        saveCurrentGameHistory();
        resetGame();
        return;  // Выход, чтобы не добавлять попытку дважды
    }

    addAttempt(attemptMessage);
}

function addAttempt(attemptMessage) {
    const attemptsList = document.getElementById('attemptsList');
    const attemptElement = document.createElement('li');
    attemptElement.textContent = attemptMessage;
    attemptElement.style.backgroundColor = `hsl(${(attempts * 30) % 360}, 100%, 50%)`;
    attemptElement.style.opacity = '1';
    attemptsList.appendChild(attemptElement);
    currentGameHistory.push(attemptMessage);
}

function saveCurrentGameHistory() {
    if (currentGameHistory.length > 0) {
        allGamesHistory.push([...currentGameHistory]);
        displayAllGamesHistory();
        currentGameHistory = [];
    }
}

function displayAllGamesHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
    allGamesHistory.forEach((game, gameIndex) => {
        const historyBlock = document.createElement('div');
        historyBlock.className = 'historyBlock';
        historyBlock.innerHTML = `<h3>Игра ${gameIndex + 1}</h3>`;
        const gameList = document.createElement('ul');
        game.forEach((attempt, attemptIndex) => {
            const attemptElement = document.createElement('li');
            attemptElement.textContent = attempt;
            attemptElement.style.backgroundColor = `hsl(${(attemptIndex * 30) % 360}, 100%, 50%)`;
            gameList.appendChild(attemptElement);
        });
        historyBlock.appendChild(gameList);
        historyContainer.appendChild(historyBlock);
    });
}

function resetGame() {
    numberToGuess = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('attemptsList').innerHTML = '';
}

document.getElementById('guessInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});