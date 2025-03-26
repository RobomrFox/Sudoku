import React, { useState, useEffect } from "react";
import "./SudokuBoard.css";
import { saveGameState } from "../services/gameService";

// SudokuBoard component that renders an interactive 9x9 game grid
// Props:
// - initialBoard: 2D array representing the initial Sudoku puzzle (9x9)
// - gameId: Unique identifier for this game (for saving to MongoDB)
const SudokuBoard = ({
  initialBoard,
  gameId,
  solution,
  onMove,
  onGameComplete,
}) => {
  // State to track the current board
  const [board, setBoard] = useState(initialBoard);
  // State to track which cell is selected
  const [selectedCell, setSelectedCell] = useState(null);
  // State to track the original puzzle cells (these can't be modified)
  const [originalCells, setOriginalCells] = useState([]);

  // On initial load, record which cells are part of the original puzzle
  useEffect(() => {
    const originals = [];
    initialBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          originals.push(`${rowIndex}-${colIndex}`);
        }
      });
    });
    setOriginalCells(originals);
  }, [initialBoard]);

  // Handle cell click
  const handleCellClick = (rowIndex, colIndex) => {
    // Don't allow selection of original cells
    if (originalCells.includes(`${rowIndex}-${colIndex}`)) {
      return;
    }
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  // Handle number input
  const handleNumberInput = async (number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // Create a deep copy of the board
    const newBoard = board.map((row) => [...row]);

    // Update the cell value
    newBoard[row][col] = number;

    // Update state
    setBoard(newBoard);

    // Notify parent component about the move if it's not clearing a cell
    if (number !== 0) {
      onMove && onMove();
    }

    // Check if the game is complete after a short delay
    // (to ensure state has updated)
    setTimeout(() => {
      const isComplete = checkGameCompletion(newBoard);

      // Save game to MongoDB
      try {
        saveGameState(gameId, newBoard, isComplete);

        if (isComplete) {
          console.log("Game complete! Showing win modal.");
          // Call the onGameComplete callback
          onGameComplete && onGameComplete();
        }
      } catch (error) {
        console.error("Failed to save game state:", error);
      }
    }, 100);
  };

  // Enhanced game completion check that validates against solution
  const checkGameCompletion = (currentBoard) => {
    // First, check if there are any empty cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0) {
          return false;
        }
      }
    }

    // Add debug logging
    console.log("Board is filled, checking against solution");
    console.log("Current board:", currentBoard);
    console.log("Solution:", solution);

    // If solution is provided, check against it
    if (solution) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          // Convert both to numbers for safe comparison
          const currentValue = Number(currentBoard[row][col]);
          const solutionValue = Number(solution[row][col]);

          if (currentValue !== solutionValue) {
            console.log(
              `Mismatch at [${row}][${col}]: ${currentValue} !== ${solutionValue}`
            );
            return false;
          }
        }
      }
    }

    console.log("Game is complete!");
    // All cells filled correctly, the game is complete
    return true;
  };

  // Handle keyboard events for number input
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedCell) return;

      const key = event.key;

      // Check if the pressed key is a number between 1-9
      if (/^[1-9]$/.test(key)) {
        handleNumberInput(parseInt(key));
      } else if (key === "Backspace" || key === "Delete" || key === "0") {
        // Clear the cell
        handleNumberInput(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, handleNumberInput]);

  return (
    <div className="sudoku-container">
      <div className="sudoku-grid">
        {/* Map through each row of the board */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Map through each cell in the row */}
            {row.map((cell, colIndex) => {
              // Check if this is an original cell
              const isOriginal = originalCells.includes(
                `${rowIndex}-${colIndex}`
              );

              // Check if this cell is selected
              const isSelected =
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex;

              // Add special classes for grid lines
              const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex < 8;
              const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex < 8;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell 
                    ${isOriginal ? "original" : ""} 
                    ${isSelected ? "selected" : ""}
                    ${isRightBorder ? "right-border" : ""}
                    ${isBottomBorder ? "bottom-border" : ""}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {/* Display cell value if not 0, otherwise empty string */}
                  {cell !== 0 ? cell : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="instructions">
        Use keyboard to enter numbers (1-9). Press Backspace to clear a cell.
      </div>
    </div>
  );
};

export default SudokuBoard;
