import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import {
  getUsernameFromLocalStorage,
  getAvatarFromLocalStorage,
} from "../utils/userHelpers";

const BallKnowledgeGame = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const sports = state?.sports || [];

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(3); // level1 to level5
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [timeTaken, setTimeTaken] = useState(0);
  const [currentQ, setCurrentQ] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch questions on load
  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(
        collection(db, "questions"),
        where("category", "==", "ball_knowledge_test"),
        where("sport", "in", sports.map((s) => s.toLowerCase()))
      );
      const snapshot = await getDocs(q);
      const all = snapshot.docs.map((doc) => doc.data());
      setQuestions(all);
    };
    fetchQuestions();
  }, [sports]);

  // Select question on index/difficulty change
  useEffect(() => {
    if (questions.length === 0 || gameOver) return;

    const filtered = questions.filter((q) => q.difficulty === `level${difficultyLevel}`);
    const fallback = questions.filter(
      (q) => q.difficulty === `level${Math.max(1, Math.min(5, difficultyLevel + 1))}`
    );

    const pool = filtered.length ? filtered : fallback;
    const randomQ = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQ(randomQ);
    setTimer(15);
    setTimeTaken(0);
  }, [index, questions, difficultyLevel]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
        setTimeTaken((t) => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !gameOver) {
      handleAnswer(null);
    }
  }, [timer, gameOver]);

  // Handle answer selection
  const handleAnswer = (selected) => {
    const correct = selected === currentQ.correctAnswer;
    const timeBonus = Math.max(0, 10 - timeTaken);
    const difficultyWeight = difficultyLevel;

    const basePoints = correct ? 15 : 0;
    const bonus = correct ? difficultyWeight * 2 + timeBonus : 0;
    const points = basePoints + bonus;

    if (correct) {
      setScore((prev) => prev + points);
      setDifficultyLevel((d) => Math.min(5, d + 1));
    } else {
      setDifficultyLevel((d) => Math.max(1, d - 1));
    }

    const newEntry = { correct, time: timeTaken, difficulty: difficultyLevel };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    setIndex((i) => i + 1);

    const estimatedScore = calculateScore(updatedHistory);

    if (
      updatedHistory.length >= 15 ||
      (updatedHistory.length >= 10 && checkStable(updatedHistory))
    ) {
      setTimeout(() => {
        submitScore(estimatedScore);
      }, 800);
    }
  };

  // Score calculation (0–100)
  const calculateScore = (data) => {
    const totalPoints = data.reduce((acc, q) => {
      if (!q.correct) return acc;
      const base = 15;
      const timeBonus = Math.max(0, 10 - q.time);
      const difficultyBonus = q.difficulty * 2;
      return acc + base + timeBonus + difficultyBonus;
    }, 0);

    const maxPossible = data.length * (15 + 10 + 10); // base + max time + difficulty
    return Math.min(100, Math.round((totalPoints / maxPossible) * 100));
  };

  // Check if performance is stable
  const checkStable = (data) => {
    if (data.length < 5) return false;
    const last5 = data.slice(-5);
    const avgDiff = last5.reduce((sum, q) => sum + q.difficulty, 0) / 5;
    return last5.every((q) => Math.abs(q.difficulty - avgDiff) <= 1);
  };

  // Submit score to Firestore
  const submitScore = async (finalScore) => {
    setGameOver(true);
    const username = getUsernameFromLocalStorage() || "Anonymous";
    const avatarURL = getAvatarFromLocalStorage();

    await addDoc(collection(db, "leaderboards"), {
      username,
      avatarURL,
      score: finalScore,
      mode: "ball_knowledge",
      difficulty: "adaptive",
      createdAt: new Date(),
    });

    navigate("/ball-knowledge/end", { state: { finalScore } });
  };

  if (!currentQ) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "24px" }}>
        🧠 Building your Ball Knowledge Quiz...
      </div>
    );
  }

  // ✅ Styles
  const styles = {
    container: {
      padding: "40px 20px",
      maxWidth: 800,
      margin: "auto",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(0,0,0,0.3)"
    },
    header: { fontSize: "28px", fontWeight: "600", marginBottom: 8 },
    timer: { fontSize: "20px", fontWeight: "bold", color: "#ff7043", marginBottom: 20 },
    question: { fontSize: "24px", marginBottom: 30, padding: "0 10px", fontWeight: "500", color: "#f9f9f9" },
    options: { display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" },
    option: {
      background: "#2e2e2e",
      border: "2px solid #444",
      padding: "14px 24px",
      fontSize: "17px",
      cursor: "pointer",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "500px",
      transition: "all 0.25s ease",
      color: "#fff"
    },
    progressRow: { marginTop: 40, display: "flex", justifyContent: "center", gap: 10 },
    dot: { width: 16, height: 16, borderRadius: "50%", backgroundColor: "#4caf50" },
    dotPending: { width: 16, height: 16, borderRadius: "50%", backgroundColor: "#999" }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Question {index + 1}</h2>
      <div style={styles.timer}>⏱ {timer}s</div>
      <h3 style={styles.question}>{currentQ.question}</h3>

      <div style={styles.options}>
        {currentQ.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)} style={styles.option}>
            {opt}
          </button>
        ))}
      </div>

      <div style={styles.progressRow}>
        {history.map((h, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: h.correct ? "#00c851" : "#ff4444"
            }}
          />
        ))}
        <span style={styles.dotPending}></span>
      </div>
    </div>
  );
};

export default BallKnowledgeGame;
