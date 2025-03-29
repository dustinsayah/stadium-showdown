import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CareerPathEnd.css";

const CareerPathEnd = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const finalScore = state?.score ?? 0;

  return (
    <div className="career-end-container">
      <h1>🎉 Career Path Complete!</h1>
      <h2>Your Final Score: {finalScore} / 30</h2>

      <div className="end-buttons">
        <button onClick={() => navigate("/career-path/setup")}>
          🔁 Play Again
        </button>
        <button onClick={() => navigate("/")}>
          🏠 Return to Home
        </button>
        <button onClick={() => navigate("/leaderboard")}>
          📊 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default CareerPathEnd;
