const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector ('[data-winning-message]');
const restartButton = document.querySelector ('[data-restart-button]');
const turnMessage = document.querySelector ('[data-turn-message]');

let isCircleTurn;


const winningcombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


const startGame = () => {
    isCircleTurn = false;
    for (const cell of cellElements) {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }
    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
    turnMessage.innerHTML = 'É a vez do X';
}

const endGame = (isDraw) => {
    if (isDraw) {
        winTextElement.innerText = 'Empate!!';
    } else {
        winTextElement.innerText = isCircleTurn ? 'O venceu!' : 'X venceu!';
    }
    winningMessage.classList.add('show-winning-message');
}

const checkForWin = (currentPlayer) => {
    return winningcombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}


const placeMark = (cell, classToAdd)=> {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove('x');
    board.classList.remove('circle');

    if (isCircleTurn) {
        board.classList.add('circle');
        turnMessage.innerHTML = 'É a vez do O'
    } else {
        board.classList.add('x');
        turnMessage.innerHTML = 'É a vez do X'
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}

const handleClick = (e) => {
    // Set X or O
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    cell.classList.add(classToAdd);
    placeMark(cell, classToAdd);

    // Check if there is a VICTORY
    const isWin = checkForWin(classToAdd);

    // Check if there is a DRAW
    const isDraw = checForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Change turn
        swapTurns();
    }
}

startGame();

restartButton.addEventListener('click', startGame);

