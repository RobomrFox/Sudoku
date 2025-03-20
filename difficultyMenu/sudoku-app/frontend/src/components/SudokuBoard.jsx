import React from "react";
import "./SudokuBoard.css";

// SudokuBoard component that renders the 9x9 game grid
// Props:
// - board: 2D array representing the Sudoku puzzle (9x9)
const SudokuBoard = ({ board }) => {
  return (
    <div className="sudoku-grid">
      {/* Map through each row of the board */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {/* Map through each cell in the row */}
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="cell">
              {/* Display cell value if not 0, otherwise empty string */}
              {cell !== 0 ? cell : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
