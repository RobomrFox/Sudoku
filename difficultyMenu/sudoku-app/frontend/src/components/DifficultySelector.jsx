import React, { useState } from "react";
import "./DifficultySelector.css";

// Component for selecting game difficulty
// Props:
// - onSelectDifficulty: callback function to handle difficulty selection
const DifficultySelector = ({ onSelectDifficulty }) => {
  // State to track currently selected difficulty
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Handler for difficulty selection
  // Updates local state and calls parent callback
  const handleSelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    onSelectDifficulty(difficulty);
  };

  return (
    <div className="difficulty-container">
      <h2>Select Difficulty</h2>
      <div className="panels-container">
        {/* Easy difficulty panel */}
        <div
          className={`panel ${selectedDifficulty === "easy" ? "selected" : ""}`}
          onClick={() => handleSelect("easy")}
        >
          <h3>Easy</h3>
          <p>Perfect for beginners</p>
          <span>More hints available</span>
        </div>

        {/* Medium difficulty panel */}
        <div
          className={`panel ${
            selectedDifficulty === "medium" ? "selected" : ""
          }`}
          onClick={() => handleSelect("medium")}
        >
          <h3>Medium</h3>
          <p>For experienced players</p>
          <span>Moderate challenge</span>
        </div>

        {/* Hard difficulty panel */}
        <div
          className={`panel ${selectedDifficulty === "hard" ? "selected" : ""}`}
          onClick={() => handleSelect("hard")}
        >
          <h3>Hard</h3>
          <p>For expert players</p>
          <span>Limited hints</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
