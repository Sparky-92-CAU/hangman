const wordBank = ['mimosa', 'gimlet', 'mojito', 'manhattan', 'martini'];
const pictures = {
    mimosa: 'mimosa.png',
    gimlet: 'gimlet.png',
    mojito: 'mojito.png',
    manhattan: 'man.png',
    martini: 'martini.png'
};
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const guessesID = document.querySelector('#guesses');
const usedID = document.querySelector('#used');
const winsID = document.querySelector('#wins');
const wordDisplayed = document.querySelector('#word');
const picture = document.querySelector('#picture');
const keyboard = document.querySelector('#keyboard');
const gameStatus = document.querySelector('#game-status');
const newGameButton = document.querySelector('#new-game');
const hangmanParts = document.querySelectorAll('.hangman-part');
let guesses = 10;
let lettersUsed = [];
let wins = 0;
let losses = 0;
let word = '';
let finished = false;

function renderBoard(message = 'Choose a letter to begin.', outcome = 'playing') {
    wordDisplayed.textContent = [...word].map(letter =>
        lettersUsed.includes(letter) || finished ? letter : '_'
    ).join(' ');
    guessesID.textContent = `Guesses Left: ${guesses}`;
    usedID.textContent = `Letters Used: ${lettersUsed.join(', ') || 'None'}`;
    winsID.textContent = `Wins: ${wins} | Losses: ${losses}`;
    gameStatus.textContent = message;
    gameStatus.dataset.state = outcome;
    newGameButton.hidden = !finished;
    picture.src = finished ? `assets/${pictures[word]}` : 'assets/drinks.jpg';
    picture.alt = finished ? `The ${word} cocktail` : 'A selection of cocktails';

    const incorrectGuesses = lettersUsed.filter(letter => !word.includes(letter)).length;
    hangmanParts.forEach((part, index) => {
        part.classList.toggle('is-visible', index < incorrectGuesses);
    });

    keyboard.replaceChildren(...[...alphabet].map(letter => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-secondary';
        button.textContent = letter.toUpperCase();
        button.disabled = lettersUsed.includes(letter) || finished;
        button.setAttribute('aria-label', `Guess ${letter}`);
        button.addEventListener('click', () => makeGuess(letter));
        return button;
    }));
}

function startGame() {
    guesses = 10;
    lettersUsed = [];
    finished = false;
    word = wordBank[Math.floor(Math.random() * wordBank.length)];
    renderBoard();
}

function makeGuess(letter) {
    if (!alphabet.includes(letter) || lettersUsed.includes(letter) || finished) {
        return;
    }

    lettersUsed.push(letter);
    const correctGuess = word.includes(letter);
    if (!correctGuess) {
        guesses--;
    }

    const won = [...word].every(character => lettersUsed.includes(character));
    if (won) {
        wins++;
        finished = true;
        renderBoard(`You guessed it! The word was ${word}.`, 'win');
        return;
    }

    if (guesses === 0) {
        losses++;
        finished = true;
        renderBoard(`Out of guesses. The word was ${word}.`, 'loss');
        return;
    }

    renderBoard(correctGuess
        ? `Good guess! ${letter.toUpperCase()} is in the word.`
        : `No ${letter.toUpperCase()}. Try again.`);
}

document.addEventListener('keyup', event => {
    if (event.key.length === 1) {
        makeGuess(event.key.toLowerCase());
    }
});
newGameButton.addEventListener('click', startGame);

startGame();
