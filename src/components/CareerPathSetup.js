import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CareerPathSetup.css";

const CareerPathSetup = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const sportsOptions = ["Basketball", "Football", "Baseball"];

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const startGame = () => {
    if (selectedSports.length === 0 || !selectedDifficulty) return;

    navigate("/career-path/game", {
      state: {
        sports: selectedSports,
        difficulty: selectedDifficulty.toLowerCase(),
      },
    });
  };

  return (
    <motion.div
      className="career-setup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="setup-title">🛣️ Career Path</h1>

      <div className="setup-section">
        <h2>Select Sport(s):</h2>
        <div className="sport-buttons">
          {sportsOptions.map((sport) => (
            <button
              key={sport}
              className={`sport-button ${
                selectedSports.includes(sport) ? "selected" : ""
              }`}
              onClick={() => toggleSport(sport)}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      <div className="setup-section">
        <h2>Select Difficulty:</h2>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        className="start-game-button"
        onClick={startGame}
        disabled={!selectedDifficulty || selectedSports.length === 0}
      >
        🚀 Start Game
      </button>
    </motion.div>
  );
};

export default CareerPathSetup;
