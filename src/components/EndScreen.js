import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EndScreen = ({ player1Score, player2Score, playerNumber }) => {
  const navigate = useNavigate();
  let resultMessage = "";

  if (player1Score > player2Score) {
    resultMessage = playerNumber === 1 ? "🎉 You Won! 🏆" : "😢 You Lost!";
  } else if (player1Score < player2Score) {
    resultMessage = playerNumber === 1 ? "😢 You Lost!" : "🎉 You Won! 🏆";
  } else {
    resultMessage = "🤝 It's a Tie!";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="end-screen"
    >
      <h2>{resultMessage}</h2>
      <h3>Final Scores:</h3>
      <h3>Player 1: {player1Score}</h3>
      <h3>Player 2: {player2Score}</h3>
      
      <button className="home-button" onClick={() => navigate("/")}>🏠 Back to Home</button>
    </motion.div>
  );
};

export default EndScreen;
