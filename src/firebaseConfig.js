 // src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgDI4XvHgG6svRSC9XtPKCTrSC99aK5q8",
  authDomain: "stadium-showdown.firebaseapp.com",
  projectId: "stadium-showdown",
  storageBucket: "stadium-showdown.firebasestorage.app",
  messagingSenderId: "590185737201",
  appId: "1:590185737201:web:9d1fbf7292bee8a8d0b250",
  measurementId: "G-SMEEMPPZYL"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 📦 Firestore DB
const db = getFirestore(app);

export { db };

