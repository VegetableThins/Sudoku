import { useEffect, useState } from "react";
import * as boards from "../../constants/boards";
import * as solver from "../../constants/solver";
import Grid from "../Grid/index";
import GridCell from "../GridCell/index";

function App() {
  var boardNum = 1;
  //using json parse json stringify to deep copy the multidimensional arrays

  var resetBoard = JSON.parse(JSON.stringify(boards.boards[boardNum]));
  var solvedBoard = solver.Solve(JSON.parse(JSON.stringify(resetBoard)));
  var currentBoard = JSON.parse(JSON.stringify(resetBoard));
  const [board, setBoard] = useState(currentBoard);

  function UpdateBoard(value, row, column) {
    var tempBoard = board;
    tempBoard[row][column] = value;
    setBoard(tempBoard);
  }

  function SolveBoard() {
    setBoard(solvedBoard);
  }

  function ResetBoard() {
    // reset board isn't resetting the input forms for some reason
    // I have no idea why this is happening
    // in the console is shows the correct values for the board
    // but the input fields are retaining the previously entered values
    // maybe has something to do with state?? I'm not sure...
    currentBoard = JSON.parse(JSON.stringify(resetBoard));
    setBoard(currentBoard);
  }

  function CheckAnswers() {
    //check the stringified versions of both boards to see if they match
    if (JSON.stringify(board) === JSON.stringify(solvedBoard)) {
      alert("Congratulations, you WON!");
    } else {
      alert("These numbers aren't correct...");
    }
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>

      <Grid>
        {board.map((row, rowIndex) => (
          <div className="Row" key={rowIndex}>
            {row.map((value, columnIndex) => (
              <GridCell
                key={columnIndex}
                row={rowIndex}
                column={columnIndex}
                value={value}
                UpdateBoard={UpdateBoard}
                isDefault={value === 0 ? false : true}
              />
            ))}
          </div>
        ))}
      </Grid>
      <button onClick={SolveBoard}>Show Solution</button>
      <button onClick={CheckAnswers}>Check Numbers!</button>
      <button onClick={ResetBoard}>Reset Board</button>
      <p>McKenzie McGilchrist</p>
    </div>
  );
}

export default App;
