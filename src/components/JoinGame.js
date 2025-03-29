import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const JoinGame = () => {
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinGame = async () => {
    const q = query(collection(db, "head_to_head_games"), where("gameCode", "==", gameCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setError("Invalid game code. Try again.");
      return;
    }

    const gameDoc = querySnapshot.docs[0];
    const gameData = gameDoc.data();

    if (gameData.status !== "waiting") {
      setError("This game is already in progress or finished.");
      return;
    }

    try {
      await updateDoc(gameDoc.ref, { status: "in-progress" });
      navigate(`/h2h/${gameCode}`);
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Join a Head-to-Head Game</h1>
      <input
        type="text"
        placeholder="Enter game code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value.toUpperCase())}
        style={styles.input}
      />
      <button onClick={joinGame} style={styles.button}>Join Game</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  input: {
    padding: "12px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    marginBottom: "12px",
    width: "250px",
    textAlign: "center",
  },
  button: {
    padding: "12px 25px",
    fontSize: "1.1rem",
    backgroundColor: "#00bfff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  error: {
    marginTop: "15px",
    color: "#ff8080",
    fontWeight: "bold",
  },
};

export default JoinGame;
