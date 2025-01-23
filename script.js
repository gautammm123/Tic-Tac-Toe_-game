const cells = document.querySelectorAll('.cell');
const currentTurnDisplay = document.getElementById('current-turn');
const gameResultDisplay = document.getElementById('game-result');
const resetButton = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes('')) {
        return 'tie';
    }

    return null;
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameOver = true;
        if (winner === 'tie') {
            gameResultDisplay.textContent = "It's a Tie!";
        } else {
            gameResultDisplay.textContent = `Player ${winner} Wins!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    currentTurnDisplay.textContent = "Player X's Turn";
    gameResultDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);