import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, orderBy, limit } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsernameFromLocalStorage, getAvatarFromLocalStorage } from "../utils/userHelpers";
import "./GuessThePlayer.css";

const GuessThePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sports, difficulty } = location.state || {};

  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [status, setStatus] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    if (!sports || !difficulty) {
      setStatus("Missing setup data. Please restart.");
      return;
    }

    const fetchPlayers = async () => {
      try {
        const q = query(
          collection(db, "players"),
          where("sport", "in", sports),
          where("difficulty", "==", difficulty)
        );
        const snapshot = await getDocs(q);
        const allPlayers = snapshot.docs.map((doc) => doc.data());
        setPlayers(shuffleArray(allPlayers).slice(0, 10));
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    fetchPlayers();
  }, [sports, difficulty]);

  useEffect(() => {
    if (players.length && currentRound < players.length) {
      setCurrentPlayer(players[currentRound]);
      setHintLevel(0);
      setTimeLeft(15);
      setGuess("");
      setStatus("");
    } else if (currentRound >= 10) {
      setGameOver(true);
    }
  }, [players, currentRound]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleWrongGuess();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const saveScore = async () => {
      if (gameOver && !scoreSubmitted) {
        const username = getUsernameFromLocalStorage();
        const avatarURL = getAvatarFromLocalStorage();
  
        if (username) {
          try {
            await addDoc(collection(db, "leaderboards"), {
              username,
              avatarURL,
              score,
              mode: "guess_the_player",
              difficulty: difficulty?.toLowerCase(), // ✅ lowercase stored
              createdAt: new Date()
            });
            setScoreSubmitted(true);
          } catch (err) {
            console.error("Error saving leaderboard score:", err);
          }
        }
      }
    };
  

    saveScore();
  }, [gameOver, scoreSubmitted, score, difficulty]);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const normalize = (str) => str?.toLowerCase().replace(/[^a-z]/g, "") || "";

  const handleGuess = () => {
    if (!guess || !currentPlayer) return;

    const input = normalize(guess);
    const [first, last] = currentPlayer.name.split(" ");
    const full = normalize(currentPlayer.name);
    const isCorrect =
      input === normalize(first) || input === normalize(last) || input === full;

    if (isCorrect) {
      const pointsByHint = [5, 3, 2, 1];
      const earnedPoints = pointsByHint[hintLevel] || 0;
      setScore((prev) => prev + earnedPoints);
      setStatus(`✅ Correct! +${earnedPoints} points`);
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, 1500);
    } else {
      handleWrongGuess();
    }
  };

  const handleWrongGuess = () => {
    if (hintLevel < 3) {
      setHintLevel((prev) => prev + 1);
      setGuess("");
      setTimeLeft(15);
      setStatus("❌ Try again...");
    } else {
      setStatus(`❌ Out of hints! Answer was: ${currentPlayer.name}`);
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, 2000);
    }
  };

  const getAllHints = () => {
    if (!currentPlayer) return [];
    const hints = [];

    if (hintLevel >= 1) hints.push(`Position: ${currentPlayer.position || "N/A"}`);
    if (hintLevel >= 2) hints.push(`Team: ${currentPlayer.team}`);
    if (hintLevel >= 3) hints.push("Final Hint: Image Unblurred!");

    return hints;
  };

  if (status === "Missing setup data. Please restart.") {
    return <h2 className="error">{status}</h2>;
  }

  if (gameOver) {
    return (
      <div className="end-screen-wrapper">
        <div className="end-screen-card">
          <h1>🏁 <span style={{ color: "#ffeb3b" }}>Game Over</span></h1>
          <h2>Your Final Score: {score} / 50</h2>

          <button onClick={() => window.location.reload()} className="end-btn">
            🔁 Play Again
          </button>
          <button onClick={() => navigate("/")} className="end-btn home">
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentPlayer) return <h2 className="loading">Loading player...</h2>;

  return (
    <div className="guess-container">
      <h1>👤 Guess The Player</h1>
      <h2>Round {currentRound + 1} / 10</h2>
      <h3>Score: {score}</h3>
      <h4>⏱️ {timeLeft}s</h4>

      <img
        src={currentPlayer.image}
        alt="Player"
        className={hintLevel < 3 ? "player-image blurred" : "player-image"}
      />

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter player name"
        onKeyDown={(e) => e.key === "Enter" && handleGuess()}
      />
      <button onClick={handleGuess}>Submit</button>

      {getAllHints().map((hint, idx) => (
        <p key={idx} className="hint">💡 {hint}</p>
      ))}

      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default GuessThePlayer;
