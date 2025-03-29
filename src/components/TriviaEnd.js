import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./TriviaEnd.css"; // ✅ Make sure this CSS file exists

const TriviaEnd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;

  // 🎯 Define the total number of questions
  const totalQuestions = 15;
  const scorePercentage = (score / totalQuestions) * 100;

  return (
    <motion.div
      className="trivia-end-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="end-title">🏆 Game Over! 🏆</h1>

      {/* 🎉 Victory or Defeat Message */}
      {scorePercentage >= 70 ? (
        <motion.h2 className="victory-message" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          🎉 Amazing! You scored **{score}** out of {totalQuestions}! 🎉
        </motion.h2>
      ) : (
        <motion.h2 className="defeat-message" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          😢 Keep practicing! You scored **{score}** out of {totalQuestions}.
        </motion.h2>
      )}

      {/* 🔥 Animated Score Display */}
      <motion.div
        className="score-box"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3>Your Score:</h3>
        <p className="score-number">{score} / {totalQuestions}</p>
      </motion.div>

      {/* 🏠 Back to Home Button */}
      <motion.button
        className="home-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/")}
      >
        🔄 Play Again or Go Home 🏠
      </motion.button>
    </motion.div>
  );
};

export default TriviaEnd;
