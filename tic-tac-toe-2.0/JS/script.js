localStorage.clear();
reset();
const boardSelect = document.querySelectorAll('#board');
const menuPanel = document.querySelector('#menu');
const gamePanel = document.querySelector('#game-panel');
const endgamePanel = document.querySelector('#endgame-panel');
const endgameMessage = document.querySelector('#endgame-message');
const restartgameButton = document.querySelector('#restartgame-button');
const turnText = document.querySelector('#turn-message');

function reset() {
    localStorage.setItem('turn', 'X');
    localStorage.setItem('board', '---------');
    for (let id =1; id <= 9; id++) {
        document.getElementById(`${id}`).innerHTML = '';
    }
    if (localStorage.getItem('starting') == 'c' && localStorage.getItem('mode') == 'cpu') {
        cpuPlays();
    }
}

function toggleStartPlayer() {
    if (localStorage.getItem(`mode`) == `cpu` && localStorage.getItem('starting') == 'p') {
        localStorage.setItem('starting', 'c');
        cpuPlays();
    } else localStorage.setItem('starting', 'p');
}

function menu() {
    endgamePanel.style.display = 'none';
    menuPanel.style.display = 'flex';
}

function start(mode) {
    endgamePanel.style.display = 'none';
    menuPanel.style.display = 'none';
    gamePanel.style.display = 'flex';
    localStorage.setItem('mode', mode);
    if (mode == 'cpu') localStorage.setItem('starting', 'p');
}

function fieldClick(id) {
    var turn = localStorage.getItem('turn')
    var board = localStorage.getItem('board');
    var button = document.getElementById(id);

    if (!button.innerHTML) {
        button.innerHTML = turn;

        if (turn == 'X') {
            localStorage.setItem('turn', 'O');
            turnText.innerHTML = `Vez: O`;
        } else {
            localStorage.setItem('turn', 'X');
            turnText.innerHTML = `Vez: X`;
        }
        board = board.substring(0, Number(id) -1) + turn + board.substring(Number(id));
        localStorage.setItem('board', board);
        var winner = verifyWinner(board);
        setTimeout (function () {
            if (winner) {
                gamePanel.style.display = 'none';
                endgamePanel.style.display = 'flex';
                endgameMessage.innerHTML = `${winner} Venceu!!`
            }
        }, 200);
        var tie = verifyTie(board);
        setTimeout (function () {
            if (tie) {
                gamePanel.style.display = 'none';
                endgamePanel.style.display = 'flex';
                endgameMessage.innerHTML = `Empate!!`
            }
        }, 200);
        
        toggleStartPlayer();
    }
}

function cpuPlays() {
    var board = localStorage.getItem('board');
    var emptySpaces = [];
    if (!board.includes('-')) return;
    for (let i=0; i < board.length; i++) {
            if (board[i] == '-') emptySpaces.push( i + 1 ); 
    }
    setTimeout (function() {
        var id = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        fieldClick(id);
    }, 200);
}

function verifyWinner(board) {
    var winner;
    winner = verifyRow(board);
    if (!winner) {
        winner = verifyCol(board);
        if (!winner) winner = verifyDiag(board);
    }
    return winner;
}

function verifyTie(board) {
    var tie;
    tie = verifyBoard(board);
    if (tie) return tie;
}

function verifyBoard(board) {
    if (!board.includes('-')) {
        var winner = verifyWinner(board);
        if (!winner)
        return board;
    }
}

function verifyRow(board) {
    if (board[0] != '-' && board[0] == board[1] && board[0] == board[2]) {
        if (board[0] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    if (board[3] != '-' && board[3] == board[4] && board[3] == board[5]) {
        if (board[3] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    if (board[6] != '-' && board[6] == board[7] && board[6] == board[8]) {
        if (board[6] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    return;
}

function verifyCol(board) {
    if (board[0] != '-' && board[0] == board[3] && board[0] == board[6]) {
        if (board[0] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    if (board[1] != '-' && board[1] == board[4] && board[1] == board[7]) {
        if (board[1] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    if (board[2] != '-' && board[2] == board[5] && board[2] == board[8]) {
        if (board[2] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    return;
}

function verifyDiag(board) {
    if (board[0] != '-' && board[0] == board[4] && board[0] == board[8]) {
        if (board[0] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    if (board[2] != '-' && board[2] == board[4] && board[2] == board[6]) {
        if (board[2] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
    return;
}

function restartGame() {
    menuPanel.style.display = 'flex';
    endgamePanel.style.display = 'none';
    localStorage.setItem('board', '---------')
    localStorage.setItem('turn', 'X');
    turnText.innerHTML = `Vez: X`;
    for (let id=1; id <=9; id++) {
        document.getElementById(`${id}`).innerHTML = '';
    }
}