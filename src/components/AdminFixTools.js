// src/components/AdminFixTools.js
import React from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminFixTools = () => {
  const normalizeSportsInFirestore = async () => {
    try {
      const questionsRef = collection(db, "questions");
      const snapshot = await getDocs(questionsRef);
      const updates = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const sport = data.sport;
        if (sport && sport !== sport.toLowerCase()) {
          const ref = doc(db, "questions", docSnap.id);
          updates.push(updateDoc(ref, { sport: sport.toLowerCase() }));
        }
      });

      await Promise.all(updates);
      alert("✅ All sports normalized to lowercase!");
    } catch (err) {
      console.error("❌ Error updating Firestore:", err);
      alert("❌ Failed to normalize sports.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔥 Admin Fix Tools</h2>
      <button onClick={normalizeSportsInFirestore}>Normalize Sports in Firestore</button>
    </div>
  );
};

export default AdminFixTools;
