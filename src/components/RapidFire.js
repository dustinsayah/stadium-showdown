import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { getUsernameFromLocalStorage, getAvatarFromLocalStorage } from "../utils/userHelpers";
import buzzerSound from "../sounds/buzzer.mp3";
import "./RapidFire.css";

const RapidFire = () => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const buzzerRef = useRef(new Audio(buzzerSound));
  const navigate = useNavigate();

  const sportsList = ["Basketball", "Football", "Soccer", "Tennis", "Hockey", "Baseball"];

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const startGame = async () => {
    if (selectedSports.length === 0) {
      setError("Please select at least one sport.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, "trivia_questions"),
        where("category", "==", "RapidFire"),
        where("sport", "in", selectedSports)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("No questions found for the selected sports.");
      }

      const fetched = snapshot.docs.map((doc) => doc.data());
      setQuestions(fetched.sort(() => 0.5 - Math.random()).slice(0, 100));
      setGameStarted(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && gameStarted && !gameOver) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      buzzerRef.current.play();
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

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
              mode: "rapid_fire",
              difficulty: "normal", // 🔒 Consistently lowercase
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
  }, [gameOver, score, scoreSubmitted]);

  const handleAnswer = (answer) => {
    if (!questions.length || gameOver) return;

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  if (error) return <h2 className="error">{error}</h2>;

  return (
    <motion.div
      className="rapid-fire-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {!gameStarted ? (
        <div className="sport-selection">
          <h1>Select Sports for Rapid Fire</h1>
          <div>
            {sportsList.map((sport) => (
              <label key={sport} className="sport-checkbox">
                <input
                  type="checkbox"
                  value={sport}
                  checked={selectedSports.includes(sport)}
                  onChange={() => toggleSport(sport)}
                />
                {sport}
              </label>
            ))}
          </div>
          <button className="start-game-button" onClick={startGame}>
            Start Rapid Fire
          </button>
        </div>
      ) : (
        <>
          <h1 className="game-title">⚡ Rapid Fire Mode ⚡</h1>
          <h2 className="timer">Time Left: {timeLeft}s</h2>
          <h2 className="score">Score: {score}</h2>

          {gameOver ? (
            <div>
              <h2>Game Over! Your Score: {score}</h2>
              <button onClick={() => window.location.reload()} className="play-again-button">
                Play Again
              </button>
              <button onClick={() => navigate("/")} className="home-button">
                Back to Home
              </button>
            </div>
          ) : (
            questions.length > 0 && (
              <motion.div
                key={questions[currentQuestionIndex].question}
                className="question-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2>{questions[currentQuestionIndex].question}</h2>
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option}
                    className="answer-button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )
          )}
        </>
      )}
    </motion.div>
  );
};

export default RapidFire;
