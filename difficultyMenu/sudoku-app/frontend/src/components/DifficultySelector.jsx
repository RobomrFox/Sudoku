import React, { useState } from "react";
import "./DifficultySelector.css";

// Component for selecting game difficulty
// Props:
// - onSelectDifficulty: callback function to handle difficulty selection
const DifficultySelector = ({ onSelectDifficulty }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (difficulty) => {
    setSelected(difficulty);
    onSelectDifficulty(difficulty);
  };

  return (
    <div className="difficulty-container">
      <h1>Select Difficulty Level</h1>

      <div className="panels-container">
        <div
          className={`panel ${selected === "easy" ? "selected" : ""}`}
          onClick={() => handleSelect("easy")}
        >
          <h3>Easy</h3>
          <p>Perfect for beginners</p>
          <p>Many pre-filled cells</p>
          <span>~10-15 minutes</span>
        </div>

        <div
          className={`panel ${selected === "medium" ? "selected" : ""}`}
          onClick={() => handleSelect("medium")}
        >
          <h3>Medium</h3>
          <p>For casual players</p>
          <p>Balanced challenge</p>
          <span>~15-25 minutes</span>
        </div>

        <div
          className={`panel ${selected === "hard" ? "selected" : ""}`}
          onClick={() => handleSelect("hard")}
        >
          <h3>Hard</h3>
          <p>For experienced players</p>
          <p>Challenging patterns</p>
          <span>~25-40 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
