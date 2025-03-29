import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BallKnowledgeSetup = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);

  const sports = ["Basketball", "Football", "Baseball"];

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const handleStart = () => {
    if (selectedSports.length > 0) {
      navigate("/ball-knowledge/game", { state: { sports: selectedSports } });
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(145deg, #0a0e31, #13255b)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      color: "white",
      fontFamily: "'Bebas Neue', sans-serif",
    },
    title: {
      fontSize: "48px",
      marginBottom: "10px",
    },
    description: {
      fontSize: "20px",
      marginBottom: "30px",
      fontWeight: "300",
      textAlign: "center",
      maxWidth: "700px",
    },
    sportGrid: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "40px",
    },
    sportBtn: (active) => ({
      padding: "12px 20px",
      borderRadius: "8px",
      border: "2px solid white",
      background: active ? "#ffc107" : "transparent",
      color: active ? "#000" : "#fff",
      fontSize: "18px",
      cursor: "pointer",
      transition: "0.3s",
    }),
    startBtn: {
      background: "#00e676",
      color: "#000",
      fontWeight: "bold",
      padding: "14px 30px",
      fontSize: "20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 Ball Knowledge Test</h1>
      <p style={styles.description}>
        This AI-powered game mode adapts to your performance in real-time.
        You'll get harder or easier questions based on how you're doing — and how quickly you answer!
        Choose your sports below and press Start to begin.
      </p>

      <div style={styles.sportGrid}>
        {sports.map((sport) => (
          <button
            key={sport}
            style={styles.sportBtn(selectedSports.includes(sport))}
            onClick={() => toggleSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      <button
        style={styles.startBtn}
        onClick={handleStart}
        disabled={selectedSports.length === 0}
      >
        🚀 Start Test
      </button>
    </div>
  );
};

export default BallKnowledgeSetup;
