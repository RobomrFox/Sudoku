import React, { useState, useEffect } from "react";
import DifficultySelector from "../components/DifficultySelector";
import SudokuBoard from "../components/SudokuBoard";
import { createNewGame } from "../services/gameService";
import { v4 as uuidv4 } from "uuid";
import "./game.css";

const GamePage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Handle difficulty selection and start a new game
  const handleDifficultySelect = async (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setLoading(true);
    setError(null);
    setMoveCount(0);
    setStartTime(Date.now());

    try {
      // Use our new createNewGame function that handles everything
      const newGameData = await createNewGame(selectedDifficulty);

      setGameData({
        gameId: newGameData.gameId,
        initialBoard: JSON.parse(newGameData.currentGrid || "[]"),
        difficulty: selectedDifficulty,
        // Make sure the solution is properly parsed if it's a string
        solution:
          typeof newGameData.solution === "string"
            ? JSON.parse(newGameData.solution)
            : newGameData.solution,
      });

      setGameStarted(true);
    } catch (err) {
      console.error("Error starting game:", err);
      setError("Failed to start game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Return to difficulty selection
  const handleNewGame = () => {
    setGameStarted(false);
    setGameData(null);
    setShowWinModal(false);
    setMoveCount(0);
    setStartTime(null);
    setEndTime(null);
  };

  // Track when a move is made
  const handleMove = () => {
    setMoveCount((prevCount) => prevCount + 1);
  };

  // Handle game completion
  const handleGameComplete = () => {
    setEndTime(Date.now());
    setShowWinModal(true);
  };

  // Format time duration in minutes and seconds
  const formatTime = (timeInMs) => {
    if (!timeInMs) return "0:00";
    const seconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="game-page">
      {!gameStarted ? (
        // Show difficulty selector when game not started
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
      ) : (
        // Show game board when game is started
        <div className="game-container">
          <div className="game-header">
            <h2>Sudoku - {difficulty}</h2>
            <div className="game-stats">
              <span className="move-counter">Moves: {moveCount}</span>
            </div>
            <button onClick={handleNewGame} className="new-game-btn">
              New Game
            </button>
          </div>

          <SudokuBoard
            initialBoard={gameData.initialBoard}
            gameId={gameData.gameId}
            solution={gameData.solution}
            onMove={handleMove}
            onGameComplete={handleGameComplete}
          />
        </div>
      )}

      {loading && <div className="loading">Loading game...</div>}
      {error && <div className="error">{error}</div>}

      {/* Win Modal */}
      {showWinModal && (
        <div className="modal-overlay">
          <div className="win-modal">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You solved the {difficulty} puzzle!</p>
            <div className="stats">
              <p>
                <strong>Total Moves:</strong> {moveCount}
              </p>
              <p>
                <strong>Time:</strong> {formatTime(endTime - startTime)}
              </p>
            </div>
            <button onClick={handleNewGame} className="new-game-btn">
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
