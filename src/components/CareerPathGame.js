import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {
  getUsernameFromLocalStorage,
  getAvatarFromLocalStorage,
} from "../utils/userHelpers";
import teamLogos from "../utils/teamLogos";
import "./CareerPathGame.css";

const CareerPathGame = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const sports = state?.sports || [];
  const difficulty = state?.difficulty || "easy";

  const [players, setPlayers] = useState([]);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(
        collection(db, "questions"),
        where("category", "==", "career_path"),
        where("sport", "in", sports.map((s) => s.toLowerCase())),
        where("difficulty", "==", difficulty)
      );
      const snapshot = await getDocs(q);
      const all = snapshot.docs.map((doc) => doc.data());
      const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 10);
      setPlayers(shuffled);
    };

    fetchPlayers();
  }, [sports, difficulty]);

  const normalize = (str) => str?.toLowerCase().replace(/[^a-z]/g, "");

  const current = players[index];

  const handleGuess = () => {
    if (!current) return;

    const input = normalize(guess);
    const name = normalize(current.name);
    const [first, last] = current.name.split(" ");
    const correct =
      input === normalize(first) ||
      input === normalize(last) ||
      input === name;

    if (correct) {
      setScore((prev) => prev + 3);
      setStatusMsg("✅ Correct! +3");
      setTimeout(goToNext, 1500);
    } else {
      setStatusMsg("❌ Incorrect!");
      setShowOptions(true);
    }
  };

  const goToNext = () => {
    if (index + 1 >= players.length) {
      setGameOver(true);
    } else {
      setIndex((prev) => prev + 1);
      setGuess("");
      setShowOptions(false);
      setStatusMsg("");
    }
  };

  const handleOptionClick = (name) => {
    if (!current) return;

    if (name === current.name) {
      setScore((prev) => prev + 1);
      setStatusMsg("✅ Correct (Multiple Choice)! +1");
    } else {
      setStatusMsg(`❌ Wrong. It was ${current.name}`);
    }
    setTimeout(goToNext, 2000);
  };

  const submitScore = async () => {
    if (scoreSubmitted) return;
    const username = getUsernameFromLocalStorage() || "Anonymous";
    const avatarURL = getAvatarFromLocalStorage();

    await addDoc(collection(db, "leaderboards"), {
      username,
      avatarURL,
      score,
      mode: "career_path",
      difficulty,
      createdAt: new Date(),
    });

    setScoreSubmitted(true);
    navigate("/career-path/end", { state: { score } });
  };

  useEffect(() => {
    if (gameOver && !scoreSubmitted) {
      submitScore();
    }
  }, [gameOver, scoreSubmitted]);

  const getOptions = () => {
    if (!current) return [];

    const incorrect = players
      .filter((p) => p.name !== current.name)
      .map((p) => p.name);
    const unique = Array.from(new Set(incorrect)).slice(0, 3);
    return [...unique, current.name].sort(() => Math.random() - 0.5);
  };

  const renderTeamLogos = (teams) =>
    teams.map((team, idx) => (
      <React.Fragment key={idx}>
        {teamLogos[team] ? (
          <img src={teamLogos[team]} alt={team} className="team-logo" />
        ) : (
          <span className="team-text">{team}</span>
        )}
        {idx < teams.length - 1 && <span className="arrow">→</span>}
      </React.Fragment>
    ));

  if (!current) return <h2 className="loading">Loading player...</h2>;

  return (
    <div className="career-container">
      <h2>Career Path: Round {index + 1} / 10</h2>
      <h3 className="score-display">Score: {score}</h3>

      <div key={current.name + index} className="career-card">
        <p><strong>College:</strong> {current.college}</p>
        <p><strong>Career:</strong> {renderTeamLogos(current.teams)}</p>
        <p><strong>Draft Position:</strong> {current.draftPosition}</p>
      </div>

      {!showOptions ? (
        <>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter player name"
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          />
          <button onClick={handleGuess}>Submit</button>
        </>
      ) : (
        <div className="options-container">
          <p>Choose the correct player:</p>
          {getOptions().map((name, idx) => (
            <button key={idx} onClick={() => handleOptionClick(name)}>
              {name}
            </button>
          ))}
        </div>
      )}

      {statusMsg && <p className="status-msg">{statusMsg}</p>}
    </div>
  );
};

export default CareerPathGame;
