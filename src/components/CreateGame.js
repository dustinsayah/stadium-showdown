import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CreateGame.css"; // Make sure this CSS file exists and is linked

const sportsOptions = ["Basketball", "Football", "Soccer", "Tennis", "Hockey", "Baseball"];
const difficulties = ["Easy", "Medium", "Hard"];

const CreateGame = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [gameCode, setGameCode] = useState("");

  const toggleSportSelection = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const createGame = async () => {
    if (selectedSports.length === 0) {
      alert("Select at least one sport!");
      return;
    }

    const newGame = {
      gameCode: Math.random().toString(36).substring(2, 7).toUpperCase(),
      sports: selectedSports,
      difficulty: difficulty.toLowerCase(),
      player1: { name: "", score: 0, answered: false },
      player2: { name: "", score: 0, answered: false },
      currentQuestionIndex: 0,
      status: "waiting",
    };

    await addDoc(collection(db, "head_to_head_games"), newGame);
    setGameCode(newGame.gameCode);
  };

  return (
    <motion.div className="game-setup-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="game-title">🏆 Create Head-to-Head Game 🏆</h1>

      <h2 className="section-label">Select Sports:</h2>
      <div className="sports-options">
        {sportsOptions.map((sport) => (
          <motion.button
            key={sport}
            className={`sport-btn ${selectedSports.includes(sport) ? "selected" : ""}`}
            onClick={() => toggleSportSelection(sport)}
            whileHover={{ scale: 1.05 }}
          >
            {sport}
          </motion.button>
        ))}
      </div>

      <h2 className="section-label">Select Difficulty:</h2>
      <select className="difficulty-select" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
            {diff}
          </option>
        ))}
      </select>

      <div className="center-buttons">
        <motion.button onClick={createGame} whileHover={{ scale: 1.1 }} className="primary-btn">
          Create Game
        </motion.button>
      </div>

      {gameCode && (
        <motion.div
          className="game-code-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="code-text">Game Code: {gameCode}</h2>
          <div className="center-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate(`/h2h/${gameCode}`)}
            >
              Start Game
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CreateGame;
