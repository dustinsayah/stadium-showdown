import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export const updatePlayerScore = async (gameId, playerField, isCorrect) => {
  if (!gameId) {
    console.error("❌ Error: Game ID is missing");
    return;
  }

  try {
    const gameRef = doc(db, "head_to_head_games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (!gameSnap.exists()) {
      console.error("❌ Error: Game not found");
      return;
    }

    const gameData = gameSnap.data();
    const currentScore = gameData[playerField]?.score ?? 0; // Ensure score is at least 0
    const newScore = isCorrect ? currentScore + 1 : currentScore; // ✅ Only add if correct

    await updateDoc(gameRef, {
      [`${playerField}.score`]: newScore, // ✅ Ensures score updates properly
      [`${playerField}.answered`]: true, // Mark player as answered
    });

  } catch (error) {
    console.error("❌ Error updating score:", error);
  }
};
