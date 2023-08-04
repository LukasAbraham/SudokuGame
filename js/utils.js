var solutions = []

const origin = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 1, 5, 6, 4, 8, 9, 7],
    [5, 6, 4, 8, 9, 7, 2, 3, 1],
    [8, 9, 7, 2, 3, 1, 5, 6, 4],
    [3, 1, 2, 6, 4, 5, 9, 7, 8],
    [6, 4, 5, 9, 7, 8, 3, 1, 2],
    [9, 7, 8, 3, 1, 2, 6, 4, 5],
];

console.log(JSON.parse(JSON.stringify(origin)))
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cells = [];
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        cells.push({ row, col });
    }
}

var pickRandomCell = randomNonRepeats(cells);
var pickRandomValue = randomNonRepeats(numbers);

function shuffleNumbers(board) {
    for (let i = 1; i <= 9; i++) {
        const ranNum = Math.floor(Math.random() * 9) + 1;
        swapNumbers(board, i, ranNum);
    }
}

function swapNumbers(board, n1, n2) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (board[x][y] === n1) {
                board[x][y] = n2;
            } else if (board[x][y] === n2) {
                board[x][y] = n1;
            }
        }
    }
}

function shuffleRows(board) {
    for (let i = 0; i < 9; i++) {
        const ranNum = Math.floor(Math.random() * 3);
        const blockNumber = Math.floor(i / 3);
        swapRows(board, i, blockNumber * 3 + ranNum);
    }
}

function swapRows(board, r1, r2) {
    const row = board[r1];
    board[r1] = board[r2];
    board[r2] = row;
}

function shuffleCols(board) {
    for (let i = 0; i < 9; i++) {
        const ranNum = Math.floor(Math.random() * 3);
        const blockNumber = Math.floor(i / 3);
        swapCols(board, i, blockNumber * 3 + ranNum);
    }
}

function swapCols(board, c1, c2) {
    for (let i = 0; i < 9; i++) {
        const colVal = board[i][c1];
        board[i][c1] = board[i][c2];
        board[i][c2] = colVal;
    }
}

function shuffle3X3Rows(board) {
    for (let i = 0; i < 3; i++) {
        const ranNum = Math.floor(Math.random() * 3);
        swap3X3Rows(board, i, ranNum);
    }
}

function swap3X3Rows(board, r1, r2) {
    for (let i = 0; i < 3; i++) {
        swapRows(board, r1 * 3 + i, r2 * 3 + i);
    }
}

function shuffle3X3Cols(board) {
    for (let i = 0; i < 3; i++) {
        const ranNum = Math.floor(Math.random() * 3);
        swap3X3Cols(board, i, ranNum);
    }
}

function swap3X3Cols(board, c1, c2) {
    for (let i = 0; i < 3; i++) {
        swapCols(board, c1 * 3 + i, c2 * 3 + i);
    }
}

function shuffleArray(copy) {
    var copy = copy.slice(0);
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function randomNonRepeats(array) {
    var copy = array.slice(0);
    return function () {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}

function checkPossiblePosition(board, r, c, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][c] === num) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (board[r][i] === num) return false;
    }
    const i0 = Math.floor(r / 3) * 3;
    const j0 = Math.floor(c / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i0 + i][j0 + j] === num) return false;
        }
    }

    return true;
}

function solveSudoku(board, x, y) {
    if (x === 9) {
        solutions.push(JSON.parse(JSON.stringify(board)));
        return;
    }

    if (!board[x][y]) {
        for (let i = 1; i <= 9; i++) {
            if (checkPossiblePosition(board, x, y, i)) {
                board[x][y] = i;
                const nextX = y === 8 ? x + 1 : x;
                const nextY = y === 8 ? 0 : y + 1;
                solveSudoku(board, nextX, nextY);
                board[x][y] = 0;
            }
        }
    } else {
        const nextX = y === 8 ? x + 1 : x;
        const nextY = y === 8 ? 0 : y + 1;
        solveSudoku(board, nextX, nextY);
    }
}

function generateCompleteBoard() {
    var copy = origin.slice(0);
    shuffleNumbers(copy);
    shuffleRows(copy);
    shuffleCols(copy);
    shuffle3X3Rows(copy);
    shuffle3X3Cols(copy);
    console.log(JSON.parse(JSON.stringify(copy)))
    return copy;
}


function generateUniqueSudoku() {
    let board = generateCompleteBoard();
    let positions = shuffleArray(cells);

    while (positions.length > 0) {
        const { row, col } = positions.pop();
        const removedNumber = board[row][col];
        board[row][col] = 0;

        let testBoard = JSON.parse(JSON.stringify(board));
        solutions = [];
        solveSudoku(testBoard, 0, 0);
        if (solutions.length > 1) {
            board[row][col] = removedNumber;
        }
    }
    console.log(JSON.parse(JSON.stringify(board)))
    return board;
}

