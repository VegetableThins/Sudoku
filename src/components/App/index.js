import { useEffect, useState } from "react";
import * as initialBoards from "../../constants/initialBoards";
import * as boards from "../../constants/boards";
import * as solver from "../../constants/solver";
import Grid from "../Grid/index";
import GridCell from "../GridCell/index";

function App() {
  var [boardNum, setBoardNum] = useState(0);
  //had to duplicate the file because of deep copying
  const solvedBoard = solver.Solve(initialBoards.initialBoards[boardNum]);
  const board = boards.boards[boardNum];

  function ChangeBoard() {
    console.log(boardNum);
    if (boardNum < 7) {
      setBoardNum(boardNum + 1);
    } else {
      setBoardNum(0);
    }
  }

  function UpdateBoard(value, row, column) {
    board[row][column] = parseInt(value);
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
      <a onClick={ChangeBoard} title="Click me to change the board!">
        <h1>Sudoku</h1>
      </a>

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
      <button onClick={CheckAnswers}>Check Numbers!</button>
      <p>McKenzie McGilchrist</p>
    </div>
  );
}

export default App;
