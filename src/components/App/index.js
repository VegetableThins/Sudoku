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
  var tempBoard = JSON.parse(JSON.stringify(resetBoard));
  const [board, setBoard] = useState(resetBoard);

  function UpdateBoard(value, row, column) {
    tempBoard[row][column] = parseInt(value);
    console.log(tempBoard);
  }

  function SolveBoard() {
    setBoard(solvedBoard);
  }

  function ResetBoard() {
    // reset isn't resetting when I have the numbers in play
    // only when the show solution is shown
    // I think it has to do with when and how the state is being set
    // but I can't for the life of me figure it out right now.
    setBoard(JSON.parse(JSON.stringify(resetBoard)));
  }

  function CheckAnswers() {
    //check the stringified versions of both boards to see if they match
    if (JSON.stringify(tempBoard) === JSON.stringify(solvedBoard)) {
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
