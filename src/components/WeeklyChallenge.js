import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { getUsernameFromLocalStorage, getAvatarFromLocalStorage } from "../utils/userHelpers";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./WeeklyChallenge.css";

const WeeklyChallenge = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [countdown, setCountdown] = useState("");
  const navigate = useNavigate();

  const weekKey = `weekly-challenge-week-${getWeekNum()}`;

  function getWeekNum() {
    const today = new Date();
    const jan1 = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today - jan1) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + jan1.getDay() + 1) / 7);
  }

  const saveCompletion = () => {
    localStorage.setItem(weekKey, "completed");
  };

  const hasCompleted = () => {
    return localStorage.getItem(weekKey) === "completed";
  };

  const getNextMondayCountdown = () => {
    const now = new Date();
    const day = now.getDay();
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + ((8 - day) % 7));
    nextMonday.setHours(0, 0, 0, 0);

    const diff = nextMonday - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    return `${d}d ${h}h ${m}m`;
  };

  useEffect(() => {
    if (hasCompleted()) {
      setAlreadyPlayed(true);
      setCountdown(getNextMondayCountdown());
      setLoading(false);
      return;
    }

    const fetchWeekly = async () => {
      try {
        const q = query(
          collection(db, "questions"),
          where("category", "==", "classic_h2h")
        );
        const snapshot = await getDocs(q);
        const all = snapshot.docs.map((doc) => doc.data());

        const seed = getWeekNum();
        const random = [...all].sort(() => 0.5 - Math.random() + seed / 100);
        setQuestions(random.slice(0, 5));
      } catch (err) {
        console.error("Weekly Challenge fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekly();
  }, []);

  const handleAnswer = (a) => {
    if (selected) return;
    setSelected(a);
    if (a === questions[index].correctAnswer) setScore((s) => s + 1);
    setTimeout(() => {
      if (index < 4) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        setGameOver(true);
        saveCompletion();
        submitScore(score + (a === questions[index].correctAnswer ? 1 : 0));
      }
    }, 1000);
  };

  const submitScore = async (finalScore) => {
    const username = getUsernameFromLocalStorage() || "Anonymous";
    const avatarURL = getAvatarFromLocalStorage();

    await addDoc(collection(db, "leaderboards"), {
      username,
      avatarURL,
      score: finalScore,
      mode: "weekly_challenge",
      difficulty: "weekly",
      createdAt: new Date(),
    });
  };

  if (loading) {
    return (
      <div className="weekly-container">
        <h2>🌀 Loading Weekly Challenge...</h2>
      </div>
    );
  }

  if (alreadyPlayed && !gameOver) {
    return (
      <div className="weekly-container">
        <h2>📅 You've already completed this week's challenge!</h2>
        <p>New questions will be available in: <strong>{countdown}</strong></p>
        <button onClick={() => navigate("/")}>🏠 Back to Home</button>
      </div>
    );
  }

  return (
    <motion.div className="weekly-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {!gameOver ? (
        <>
          <h1>📅 Weekly Challenge</h1>
          <h2>Week {getWeekNum()} • Question {index + 1} / 5</h2>
          {questions.length > 0 && (
            <>
              <h3>{questions[index].question}</h3>
              <div className="answer-options">
                {questions[index].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={
                      selected
                        ? opt === questions[index].correctAnswer
                          ? "correct"
                          : "wrong"
                        : ""
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <h4>Score: {score}</h4>
            </>
          )}
        </>
      ) : (
        <div className="end-screen">
          <h1>🏁 Challenge Complete!</h1>
          <h2>Your Score: {score} / 5</h2>
          <button onClick={() => navigate("/")}>🏠 Back to Home</button>
        </div>
      )}
    </motion.div>
  );
};

export default WeeklyChallenge;
