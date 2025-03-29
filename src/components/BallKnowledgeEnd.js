// BallKnowledgeEnd.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BallKnowledge.css";

const BallKnowledgeEnd = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const finalScore = state?.finalScore || 0;

  const getReaction = (score) => {
    if (score >= 90) return "🏀 Sports Genius!";
    if (score >= 70) return "🔥 Well Played!";
    if (score >= 50) return "💪 Decent Knowledge!";
    return "🧠 Keep Grinding!";
  };

  return (
    <div className="bk-container">
      <h1 className="bk-question">Your Ball Knowledge Score</h1>
      <h2 className="bk-timer" style={{ fontSize: "48px", margin: "20px 0" }}>
        {finalScore} / 100
      </h2>
      <h3 style={{ fontSize: "24px", color: "#0ef" }}>{getReaction(finalScore)}</h3>

      <div style={{ marginTop: "40px" }}>
        <button className="bk-option" onClick={() => navigate("/")}>🏠 Back to Home</button>
        <button className="bk-option" onClick={() => navigate("/ball-knowledge")}>🔁 Try Again</button>
      </div>
    </div>
  );
};

export default BallKnowledgeEnd;
