// src/utils/submitScore.js
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitScore = async (mode, difficulty, score, username, avatar) => {
  try {
    await addDoc(collection(db, "leaderboards"), {
      username,
      avatar,
      mode,
      difficulty,
      score,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ Failed to submit score:", err);
  }
};
