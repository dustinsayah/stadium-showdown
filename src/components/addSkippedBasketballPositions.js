// addSkippedBasketballPositions.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

// 🔐 Replace with your Firebase config

  const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxx",
    authDomain: "stadium-showdown.firebaseapp.com",
    projectId: "stadium-showdown",
    storageBucket: "stadium-showdown.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Skipped Basketball Players Only
const basketballSkipped = {
  "Herbert Jones": "SF",
  "Alperen Sengun": "C",
  "Jabari Smith Jr.": "PF",
  "Landry Shamet": "SG",
  "Terance Mann": "SG",
  "Austin Reaves": "SG",
  "Josh Giddey": "PG",
  "Cam Thomas": "SG",
  "Jalen Williams": "SG",
  "Jeremy Sochan": "PF",
  "Malachi Flynn": "PG",
  "Julian Champagnie": "SF",
  "Tari Eason": "SF",
  "Cole Anthony": "PG",
  "Steven Adams": "C",
  "Payton Pritchard": "PG",
  "Keyonte George": "PG",
  "Dyson Daniels": "SG",
  "Caris LeVert": "SG",
  "Devin Vassell": "SG"
};

async function addSkippedPositions() {
  const playersRef = collection(db, "players");
  const snapshot = await getDocs(playersRef);

  for (const playerDoc of snapshot.docs) {
    const data = playerDoc.data();
    const position = basketballSkipped[data.name];

    if (data.sport === "Basketball" && position) {
      await updateDoc(doc(db, "players", playerDoc.id), { position });
      console.log(`✅ Updated: ${data.name} → ${position}`);
    }
  }

  console.log("🎯 All skipped Basketball players updated.");
}

addSkippedPositions().catch((err) => console.error("❌ Error updating positions:", err));
