var solutions = []

function checkPossiblePosition(board, r, c, n) {
    for (let i = 0; i < 9; i++) {
        if (board[i][c] === n) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (board[r][i] === n) return false;
    }
    const i0 = Math.floor(r / 3) * 3;
    const j0 = Math.floor(c / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i0 + i][j0 + j] === n) return false;
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateCompleteBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let row = 0; row < 9; row++) {
        shuffleArray(numbers);
        for (let col = 0; col < 9; col++) {
            for (let num of numbers) {
                if (checkPossiblePosition(board, row, col, num)) {
                    board[row][col] = num;
                    break;
                }
            }
        }
    }
    return board;
}

function generateUniqueSudoku() {
    let board = generateCompleteBoard();
    console.log(board);
    let cells = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells.push({ row, col });
        }
    }

    shuffleArray(cells);

    while (cells.length > 0) {
        const { row, col } = cells.pop();
        const removedNumber = board[row][col];
        board[row][col] = 0;

        let testBoard = JSON.parse(JSON.stringify(board));
        solutions = [];
        solveSudoku(testBoard, 0, 0);
        if(solutions.length != 1) {
            board[row][col] = removedNumber;
        }
    }

    return board;
}


const board = generateUniqueSudoku();
console.log(board);
solveSudoku(board, 0, 0);
console.log(solutions.length)
console.log(solutions[0]);


// function hasSolution(board) {
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         if (board[i][j] === 0) {
//           for (let n = 1; n <= 9; n++) {
//             if (checkPossiblePosition(board, i, j, n)) {
//               board[i][j] = n;
//               if (hasSolution(board)) {
//                 return true;
//               }
//               board[i][j] = 0;
//             }
//           }
//           return false;
//         }
//       }
//     }
//     return true;
//   }
  