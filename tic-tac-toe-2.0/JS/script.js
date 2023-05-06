localStorage.setItem('turn', 'X');
localStorage.setItem('board', '---------')
const boardSelect = document.querySelectorAll('#board');
const endgamePanel = document.querySelector('#endgame-panel');
const endgameMessage = document.querySelector('#endgame-message');
const restartgameButton = document.querySelector('#restartgame-button');

function fieldClick(id) {
    var turn = localStorage.getItem('turn')
    var board = localStorage.getItem('board');
    var button = document.getElementById(id);

    if (!button.innerHTML) {
        button.innerHTML = turn;

        if (turn == 'X') {
            localStorage.setItem('turn', 'O');
        } else {
            localStorage.setItem('turn', 'X');
        }
        board = board.substring(0, Number(id) -1) + turn + board.substring(Number(id));
        localStorage.setItem('board', board);
        var winner = verifyWinner(board);
        setTimeout (function () {
                if (winner) {
                endgamePanel.style.display = 'flex';
                endgameMessage.innerHTML = `${winner} Venceu!!`
            }
        }, 100);
    }
    
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
    endgamePanel.style.display = 'none';
    localStorage.setItem('board', '---------')
    boardSelect['.field'].forEach(boardSelect[0].innerHTML = '');
}