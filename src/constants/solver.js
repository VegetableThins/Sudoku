//credits for the solution
// https://medium.com/swlh/backtracking-algorithm-to-solve-sudoku-puzzle-in-javascript-732aedcf5e2

// solves the puzzle by using a Backtrace/Bruteforce Algorithm
export function Solve(board) {
  // it first looks for the next empty spot,
  var emptySpot = NextEmptySpot(board);
  var row = emptySpot[0];
  var column = emptySpot[1];

  // if row === -1 there are no next empty spots thus returning the board
  if (row === -1) {
    return board;
  }

  // it then loops through 1 to 9 in the spot whilst checking to see if it is a valid number
  for (var num = 1; num <= 9; num++) {
    if (CheckValue(board, row, column, num)) {
      // if it finds a valid number, it sets that number at that position and calls itself again
      board[row][column] = num;
      Solve(board);
    }
  }

  debugger;
  if (NextEmptySpot(board)[0] !== -1) {
    board[row][column] = 0;
  }

  return board;
}

// checks the board for the next spot by looking for a 0
function NextEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

// checks if the value wanting to be applied is already in the row, column or square
function CheckValue(board, row, column, value) {
  if (
    CheckRow(board, row, value) &&
    CheckColumn(board, column, value) &&
    CheckSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
}

// checks the row by checking if the value wanting to be applied is already in the row
function CheckRow(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
}

// checks the column by checking if the value wanting to be applied is already in the column
function CheckColumn(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
}

// checks the square by checking if the value wanting to be applied is already in the square
function CheckSquare(board, row, column, value) {
  var boxRow = Math.floor(row / 3) * 3;
  var boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
}
