import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ClassicTriviaEnd = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 20 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="end-screen"
    >
      <h2>Game Over!</h2>
      <h3>Your Final Score: {score} / {total}</h3>
      
      <button className="home-button" onClick={() => navigate("/")}>🏠 Back to Home</button>
    </motion.div>
  );
};

export default ClassicTriviaEnd;
