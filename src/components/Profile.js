import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getUsernameFromLocalStorage,
  getAvatarFromLocalStorage,
  setAvatarToLocalStorage,
} from "../utils/userHelpers";
import badges from "../utils/badges";
import XPBar from "./XPBar";
import avatarList from "../utils/avatarList";
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState(getUsernameFromLocalStorage() || "");
  const [editingUsername, setEditingUsername] = useState(!username);
  const [avatarURL, setAvatarURL] = useState(getAvatarFromLocalStorage());

  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [bestScores, setBestScores] = useState({});
  const [gameHistory, setGameHistory] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [selectingAvatar, setSelectingAvatar] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchStats = async () => {
      const q = query(
        collection(db, "leaderboards"),
        where("username", "==", username),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map((doc) => doc.data());

      setGamesPlayed(entries.length);
      setGameHistory(entries.slice(0, 5));

      let scoreMap = {};
      let totalXp = 0;
      let classicCorrect = 0;
      let classicTotal = 0;
      const modesPlayed = new Set();
      const sportCounts = {};

      entries.forEach((entry) => {
        const key = `${entry.mode}-${entry.difficulty}`;
        if (!scoreMap[key] || entry.score > scoreMap[key]) {
          scoreMap[key] = entry.score;
        }

        if (entry.mode === "classic_trivia") {
          classicCorrect += entry.score;
          classicTotal += 15;
        }

        if (entry.sport) {
          const sportKey = entry.sport.toLowerCase();
          sportCounts[sportKey] = (sportCounts[sportKey] || 0) + 1;
        }

        totalXp += entry.score;
        modesPlayed.add(entry.mode);
      });

      setBestScores(scoreMap);
      setXp(totalXp);
      setLevel(Math.floor(totalXp / 100) + 1);

      setEarnedBadges(
        badges.filter(
          (badge) =>
            typeof badge.condition === "function" &&
            badge.condition({
              gamesPlayed: entries.length,
              bestScores: scoreMap,
              xp: totalXp,
              modesPlayed,
              classicAccuracy:
                classicTotal > 0 ? classicCorrect / classicTotal : 0,
              username,
              avatarURL,
              sportCounts,
              lastPlayedHour: new Date().getHours(),
              earnedBadges,
            })
        )
      );
    };

    fetchStats();
  }, [username, avatarURL]);

  const handleUsernameSave = async () => {
    const cleaned = username.trim().toLowerCase();
    if (!cleaned || cleaned.length > 20) return;

    localStorage.setItem("username", cleaned);
    try {
      await setDoc(doc(db, "users", cleaned), { username: cleaned }, { merge: true });
    } catch (err) {
      console.error("Failed to save username:", err);
    }
    setEditingUsername(false);
  };

  const handleAvatarChange = async (url) => {
    setAvatarURL(url);
    setAvatarToLocalStorage(url);

    if (username) {
      try {
        await setDoc(doc(db, "users", username), { avatarURL: url }, { merge: true });
      } catch (err) {
        console.error("Failed to save avatar:", err);
      }
    }

    setSelectingAvatar(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={avatarURL} alt="avatar" className="profile-avatar" />
        {editingUsername ? (
          <div className="username-editor">
            <input
              type="text"
              value={username}
              maxLength={20}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleUsernameSave}>✅ Save</button>
          </div>
        ) : (
          <>
            <h2>{username}</h2>
            <button onClick={() => setEditingUsername(true)}>✏️ Edit Username</button>
          </>
        )}
        <XPBar xp={xp} />
        <p>Total Games Played: {gamesPlayed}</p>
        <button onClick={() => setSelectingAvatar(!selectingAvatar)}>
          {selectingAvatar ? "Cancel" : "Change Avatar"}
        </button>
      </div>

      {selectingAvatar && (
        <div className="avatar-picker">
          {avatarList.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`avatar-${i}`}
              className="avatar-option"
              onClick={() => handleAvatarChange(url)}
            />
          ))}
        </div>
      )}

      <div className="profile-section">
        <h3>🎯 Best Scores</h3>
        <ul>
          {Object.entries(bestScores).map(([key, score]) => (
            <li key={key}>{key.replace(/_/g, " ")}: {score}</li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>🕹️ Recent Games</h3>
        <ul>
          {gameHistory.map((game, index) => (
            <li key={index}>
              {game.mode.replace(/_/g, " ")} - {game.difficulty || "normal"} - {game.score}
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>🏅 Badges</h3>
        <div className="badge-grid">
          {badges.map((badge) => {
            const unlocked = earnedBadges.includes(badge);
            return (
              <div
                key={badge.id}
                className={`badge ${unlocked ? "unlocked" : "locked"}`}
                title={badge.description}
              >
                {unlocked ? badge.emoji : "❓"}
                <span className="badge-title">{badge.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
