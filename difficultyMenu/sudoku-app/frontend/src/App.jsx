import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
import SudokuBoard from "./components/SudokuBoard";
import { getSudokuPuzzle } from "./services/sudokuService.js";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

function App() {
  console.log("App component rendering"); // Debug log

  // State management using React hooks
  const [difficulty, setDifficulty] = useState(null); // Stores selected difficulty level
  const [gameStarted, setGameStarted] = useState(false); // Tracks if game has started
  const [board, setBoard] = useState(null); // Stores the sudoku board data
  const [error, setError] = useState(null); // Manages error states

  // Handler for difficulty selection
  const handleDifficultySelect = async (selectedDifficulty) => {
    console.log("Selected difficulty:", selectedDifficulty);
    setDifficulty(selectedDifficulty);
    try {
      // Fetch puzzle from backend API
      const puzzle = await getSudokuPuzzle(selectedDifficulty);
      if (puzzle && puzzle.board) {
        setBoard(puzzle.board);
        setGameStarted(true);
        setError(null);
      } else {
        throw new Error("Invalid puzzle data received");
      }
    } catch (error) {
      console.error("Failed to start game:", error);
      setError("Failed to load puzzle. Please try again.");
    }
  };

  // Render component
  return (
    <div className="app-container">
      <h1>Sudoku Game</h1>
      <MusicPlayer />
      <div>Testing Initial Render</div>

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}

      {/* Conditional rendering based on game state */}
      {!gameStarted ? (
        // Show difficulty selector before game starts
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
      ) : (
        // Show game board after difficulty is selected
        <div className="game-container">
          <h2>Sudoku - {difficulty} mode</h2>
          {board && <SudokuBoard board={board} />}
          <button onClick={() => setGameStarted(false)}>
            Change Difficulty
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
