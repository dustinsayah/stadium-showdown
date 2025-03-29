// ✅ GuessPlayerSetup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuessPlayerSetup.css";

const GuessPlayerSetup = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const startGame = () => {
    if (selectedSports.length === 0 || !selectedDifficulty) {
      alert("Please select at least one sport and a difficulty.");
      return;
    }
    navigate("/guessplayer/game", {
      state: {
        sports: selectedSports,
        difficulty: selectedDifficulty,
      },
    });
  };

  return (
    <div className="setup-container">
      <h1>👤 Guess The Player Setup</h1>
      <div className="setup-section">
        <h3>Select Sports</h3>
        {['Basketball', 'Football', 'Baseball'].map((sport) => (
          <button
            key={sport}
            className={`setup-button ${selectedSports.includes(sport) ? 'selected' : ''}`}
            onClick={() => toggleSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      <div className="setup-section">
        <h3>Select Difficulty</h3>
        {['Easy', 'Medium', 'Hard'].map((level) => (
          <button
            key={level}
            className={`setup-button ${selectedDifficulty === level ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <button className="start-button" onClick={startGame}>Start Game</button>
    </div>
  );
};

export default GuessPlayerSetup;