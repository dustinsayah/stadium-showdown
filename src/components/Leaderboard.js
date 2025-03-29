import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [mode, setMode] = useState("classic_trivia");
  const [difficulty, setDifficulty] = useState("easy");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setScores([]);

        const filters = [where("mode", "==", mode)];

        // Handle difficulty per mode
        if (
          mode === "classic_trivia" ||
          mode === "guess_the_player" ||
          mode === "career_path"
        ) {
          filters.push(where("difficulty", "==", difficulty.toLowerCase()));
        } else if (mode === "rapid_fire") {
          filters.push(where("difficulty", "==", "normal"));
        } else if (mode === "ball_knowledge") {
          filters.push(where("difficulty", "==", "adaptive"));
        } else if (mode === "weekly_challenge") {
          filters.push(where("difficulty", "==", "weekly"));
        }

        if (timeFilter === "week") {
          const oneWeekAgo = Timestamp.fromDate(
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          );
          filters.push(where("createdAt", ">=", oneWeekAgo));
        }

        const q = query(
          collection(db, "leaderboards"),
          ...filters,
          orderBy("score", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setScores(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchScores();
  }, [mode, difficulty, timeFilter]);

  const handleModeChange = (e) => {
    const selected = e.target.value;
    setMode(selected);

    if (selected === "rapid_fire") {
      setDifficulty("normal");
    } else if (selected === "ball_knowledge") {
      setDifficulty("adaptive");
    } else if (selected === "weekly_challenge") {
      setDifficulty("weekly");
    } else {
      setDifficulty("easy");
    }
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>

      <div className="leaderboard-controls">
        <select value={mode} onChange={handleModeChange}>
          <option value="classic_trivia">Classic Trivia</option>
          <option value="guess_the_player">Guess the Player</option>
          <option value="rapid_fire">Rapid Fire</option>
          <option value="ball_knowledge">Ball Knowledge Test</option>
          <option value="career_path">Career Path</option>
          <option value="weekly_challenge">Weekly Challenge</option>
        </select>

        {["classic_trivia", "guess_the_player", "career_path"].includes(mode) && (
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        )}

        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="week">This Week</option>
        </select>
      </div>

      <ul className="leaderboard-list">
        {scores.length === 0 ? (
          <p className="no-scores">No scores found for this mode.</p>
        ) : (
          scores.map((entry, index) => (
            <li key={index} className="leaderboard-entry">
              <span className="rank">#{index + 1}</span>
              {entry.avatarURL && (
                <img src={entry.avatarURL} alt="avatar" className="avatar-icon" />
              )}
              <span className="username">{entry.username}</span>
              <span className="score">{entry.score}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
