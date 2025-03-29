import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 📘 How to Play Button */}
      <motion.button
        className="how-to-top-button"
        onClick={() => navigate("/how-to-play")}
        whileHover={{ scale: 1.05 }}
      >
        📘 How to Play
      </motion.button>

      {/* 🏆 Title */}
      <h1 className="home-title">🏆 Stadium Showdown 🏆</h1>
      <p className="home-subtitle">
        Test your sports knowledge in different game modes!
      </p>

      {/* 🎮 Game Mode Buttons */}
      <div className="button-grid">
        <motion.button
          className="home-button classic"
          onClick={() => navigate("/classic-trivia")}
          whileHover={{ scale: 1.07 }}
        >
          🎯 Classic Trivia
        </motion.button>

        <motion.button
          className="home-button rapid"
          onClick={() => navigate("/rapid-fire")}
          whileHover={{ scale: 1.07 }}
        >
          ⚡ Rapid Fire
        </motion.button>

        <motion.button
          className="home-button h2h"
          onClick={() => navigate("/create-h2h")}
          whileHover={{ scale: 1.07 }}
        >
          🤼 Create Head-to-Head
        </motion.button>

        <motion.button
          className="home-button join-h2h"
          onClick={() => navigate("/join-h2h")}
          whileHover={{ scale: 1.07 }}
        >
          🔢 Join H2H Game
        </motion.button>

        <motion.button
          className="home-button guess-player"
          onClick={() => navigate("/guessplayer")}
          whileHover={{ scale: 1.07 }}
        >
          👤 Guess the Player
        </motion.button>

        <motion.button
          className="home-button weekly"
          onClick={() => navigate("/weekly-challenge")}
          whileHover={{ scale: 1.07 }}
        >
          📅 Weekly Challenge
        </motion.button>

        <motion.button
          className="home-button ai"
          onClick={() => navigate("/ball-knowledge")}
          whileHover={{ scale: 1.07 }}
        >
          🧠 Ball Knowledge Test
        </motion.button>

        <motion.button
          className="home-button career"
          onClick={() => navigate("/career-path/setup")}
          whileHover={{ scale: 1.07 }}
        >
          🛣️ Career Path
        </motion.button>
      </div>

      {/* 🔽 Additional Options */}
      <div className="extra-buttons">
        <button className="extra-btn" onClick={() => navigate("/leaderboard")}>
          🏆 View Leaderboard
        </button>
        <button className="extra-btn" onClick={() => navigate("/profile")}>
          🙋‍♂️ My Profile
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
