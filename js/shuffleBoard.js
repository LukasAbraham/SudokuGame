function shuffleNumbers(board) {
    for (let i = 1; i <= 9; i++) {
      const ranNum = Math.floor(Math.random() * 9) + 1;
      console.log(ranNum);
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
  
  // Example of usage:
  const board = [
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
  
  shuffleNumbers(board);
  shuffleRows(board);
  shuffleCols(board);
  shuffle3X3Rows(board);
  shuffle3X3Cols(board);
  
  console.log(board);
  