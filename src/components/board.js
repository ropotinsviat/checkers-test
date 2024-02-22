import Square from "../components/square.js";
import { useState, useEffect } from "react";
import clearBoard, { emptyBoard, heartBoard } from "../utils/boardHelper.js";

function Board({ board, setBoard, makeMove, isWhite, turn, movesInfo }) {
  const [selectedCell, setSelectedCell] = useState([null, null]);

  useEffect(() => setBoard(emptyBoard), []);
  useEffect(() => {
    if (movesInfo?.moves.length === 1) {
      cellClicked(...movesInfo.moves[0].position);
    }
  }, [movesInfo]);

  function cellClicked(i, j) {
    if (isWhite !== turn) return;

    const newBoard = [...board];

    if (selectedCell[0] === i && selectedCell[1] === j) {
      clearBoard(newBoard);
      setSelectedCell([null, null]);
    } else if (typeof board[i][j] === "string") {
      clearBoard(newBoard);
      makeMove(selectedCell[0], selectedCell[1], i, j);
      setSelectedCell([null, null]);
    } else {
      clearBoard(newBoard);
      const checkerMovesInfo = movesInfo.moves.find(
        (e) => e.position[0] === i && e.position[1] === j
      );

      if (checkerMovesInfo) {
        setSelectedCell([i, j]);
        checkerMovesInfo.moves.forEach((move) => {
          newBoard[move[0]][move[1]] = movesInfo.attack ? "R" : "G";
        });
      } else {
        setSelectedCell([null, null]);
      }
    }

    setBoard(newBoard);
  }

  return (
    <div className={`board-wrapper ${isWhite ? "" : "rotated"}`}>
      {board.map((row, rowIndex) => (
        <div className="board" key={rowIndex}>
          {row.map((checker, columnIndex) => (
            <Square
              key={`${rowIndex}-${columnIndex}`}
              isBrown={(rowIndex + columnIndex) % 2 === 1}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              checker={checker}
              selectedCell={selectedCell}
              cellClicked={cellClicked}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
