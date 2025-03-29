import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { submitScore } from "../utils/submitScore";
import { getUsernameFromLocalStorage, getAvatarFromLocalStorage } from "../utils/userHelpers";
import "./ClassicTrivia.css";

const ClassicTrivia = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const sportsOptions = ["Basketball", "Football", "Soccer", "Tennis", "Hockey", "Baseball"];

  const handleSportSelection = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const fetchQuestions = async () => {
    if (!selectedDifficulty || selectedSports.length === 0) {
      console.error("❌ No difficulty or sport selected.");
      return;
    }

    const normalizedSports = selectedSports.map((s) => s.toLowerCase());

    try {
      const q = query(
        collection(db, "questions"),
        where("category", "==", "classic_h2h"),
        where("sport", "in", normalizedSports),
        where("difficulty", "==", selectedDifficulty)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.error("❌ No questions found.");
        return;
      }

      const data = snapshot.docs.map((doc) => doc.data());
      setQuestions(data.slice(0, 15));
      setGameStarted(true);
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const handleRestart = () => navigate("/");

  useEffect(() => {
    const username = getUsernameFromLocalStorage();
    const avatar = getAvatarFromLocalStorage();

    if (
      gameOver &&
      !scoreSubmitted &&
      selectedDifficulty &&
      selectedSports.length > 0 &&
      username
    ) {
      submitScore("classic_trivia", selectedDifficulty, score, username, avatar);
      setScoreSubmitted(true);
    }
  }, [gameOver, scoreSubmitted, selectedDifficulty, selectedSports, score]);

  return (
    <motion.div 
      className="classic-trivia-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {!gameStarted ? (
        <div className="setup-screen">
          <h1>🎯 Classic Trivia</h1>
          <h2>Select Sports:</h2>
          <div className="sports-options">
            {sportsOptions.map((sport) => (
              <button
                key={sport}
                className={selectedSports.includes(sport) ? "selected" : ""}
                onClick={() => handleSportSelection(sport)}
              >
                {sport}
              </button>
            ))}
          </div>

          <h2>Select Difficulty:</h2>
          <select onChange={handleDifficultyChange} value={selectedDifficulty}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="start-button-wrapper">
            <button
              onClick={fetchQuestions}
              disabled={!selectedDifficulty || selectedSports.length === 0}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : !gameOver ? (
        <div className="game-screen">
          <h2 className="question-count">Question {currentQuestionIndex + 1} / 15</h2>
          <h3 className="question">{questions[currentQuestionIndex].question}</h3>
          <div className="answer-options">
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={
                  selectedAnswer
                    ? option === questions[currentQuestionIndex].correctAnswer
                      ? "correct"
                      : "wrong"
                    : ""
                }
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <h3 className="score">Score: {score}</h3>
        </div>
      ) : (
        <div className="end-screen">
          <h1>🏆 Game Over!</h1>
          <h2>Your Score: {score} / 15</h2>
          <button onClick={() => window.location.reload()}>🔁 Play Again</button>
          <button onClick={handleRestart}>🏠 Back to Home</button>
        </div>
      )}
    </motion.div>
  );
};

export default ClassicTrivia;
