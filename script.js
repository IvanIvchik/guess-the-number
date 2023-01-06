'use strict';

const guessingNumberGame = {
    hiddenNumber: null,
    scoreGame: null,
    init() {
        this.startGame();
        document.addEventListener('click', this.action.bind(this));
    },
    guessingNumber() {
        return Math.trunc(Math.random() * 20) + 1;
    },
    action(e) {
        const target = e.target;
        if (target.classList.contains('again')) {
            this.startGame();
        } else if (target.classList.contains('check')) {
            this.checkEnteredValue();
        }
    },
    startGame() {
        const fromStorage = localStorage.getItem('guessGame');
        if(fromStorage) {
            document.querySelector('.highscore').innerHTML = fromStorage;
        }
        this.scoreGame = 20;
        this.hiddenNumber = this.guessingNumber();
        document.querySelector('.score').innerHTML = guessingNumberGame.scoreGame;
        this.changeGuessMessage('Начни угадывать');
        document.querySelector('.question').innerHTML = '???';
        document.body.classList.remove('win-game');
        document.body.classList.remove('lose-game');
    },
    changeGuessMessage(text) {
        document.querySelector('.guess-message').innerHTML = text;
    },
    decrementCounter() {
        this.scoreGame -= 1;
        this.checkAttention();
        document.querySelector('.score').innerHTML = guessingNumberGame.scoreGame;
    },
    checkEnteredValue() {
        const enteredValue = +document.querySelector('.number-input').value;
        if (enteredValue && this.scoreGame > 0) {
            if (enteredValue < this.hiddenNumber) {
                this.changeGuessMessage('Слишком мало');
                this.decrementCounter();
            } else if (enteredValue > this.hiddenNumber) {
                this.changeGuessMessage('Слишком много');
                this.decrementCounter();
            } else {
                this.winGame();
            }
        }
    },
    checkAttention() {
        if (this.scoreGame === 0) this.loseGame();
    },
    winGame() {
        document.body.classList.add('win-game');
        this.changeGuessMessage('Вы выйграли!');
        document.querySelector('.question').innerHTML = this.hiddenNumber;
        this.saveResult();
    },
    loseGame() {
        document.body.classList.add('lose-game');
        this.changeGuessMessage('Вы проиграли!');
        document.querySelector('.question').innerHTML = this.hiddenNumber;
    },
    saveResult() {
        let bestResult = localStorage.getItem('guessGame');
        if (bestResult) {
            if (bestResult < this.scoreGame) {
                bestResult = this.scoreGame;
                localStorage.setItem('guessGame', bestResult);
            }
        } else localStorage.setItem('guessGame', this.scoreGame);
    }
}

guessingNumberGame.init()
