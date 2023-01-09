'use strict';

const guessingNumberGame = {
    hiddenNumber: null,
    scoreGame: null,
    isCurrentGame: true,
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
        if (fromStorage) {
            document.querySelector('.highscore').innerHTML = fromStorage;
        }
        this.scoreGame = 20;
        this.hiddenNumber = this.guessingNumber();
        document.querySelector('.score').innerHTML = guessingNumberGame.scoreGame;
        this.changeGuessMessage('Начни угадывать');
        document.querySelector('.question').innerHTML = '???';
        document.body.classList.remove('win-game');
        document.body.classList.remove('lose-game');
        this.isCurrentGame = true;
    },
    changeGuessMessage(text) {
        document.querySelector('.guess-message').innerHTML = text;
    },
    decrementCounter() {
        this.scoreGame -= 1;
        this.checkAttention();
        document.querySelector('.score').innerHTML = this.scoreGame;
    },
    checkEnteredValue() {
        const enteredValue = +document.querySelector('.number-input').value;
        let isPermissibleInterval = this.checkInputInterval(enteredValue);
        if (enteredValue && this.isCurrentGame && isPermissibleInterval) {
            console.log(isPermissibleInterval)
            if (enteredValue < this.hiddenNumber) {
                this.changeGuessMessage('Слишком мало');
                this.decrementCounter();
            } else if (enteredValue > this.hiddenNumber) {
                this.changeGuessMessage('Слишком много');
                this.decrementCounter();
            } else {
                this.winGame();
            }
        } else if (enteredValue && this.isCurrentGame && !isPermissibleInterval) {
            this.changeGuessMessage('Введите число от 1 до 20!');
        } else if (!enteredValue) {
            this.changeGuessMessage('Введите число!');
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
        this.isCurrentGame = false;
    },
    loseGame() {
        document.body.classList.add('lose-game');
        this.changeGuessMessage('Вы проиграли!');
        document.querySelector('.question').innerHTML = this.hiddenNumber;
        this.isCurrentGame = false;
    },
    saveResult() {
        let bestResult = localStorage.getItem('guessGame');
        if (bestResult) {
            if (bestResult < this.scoreGame) {
                bestResult = this.scoreGame;
                localStorage.setItem('guessGame', bestResult);
            }
        } else localStorage.setItem('guessGame', this.scoreGame);
    },
    checkInputInterval(num) {
        return (num <= 0 || num > 20) ?  false : true;
    }
}

guessingNumberGame.init()
