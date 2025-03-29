import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgDI4XvHgG6svRSC9XtPKCTrSC99aK5q8",
  authDomain: "stadium-showdown.firebaseapp.com",
  projectId: "stadium-showdown",
  storageBucket: "stadium-showdown.appspot.com",
  messagingSenderId: "590185737201",
  appId: "1:590185737201:web:9d1fbf7292bee8a8d0b250",
  measurementId: "G-SMEEMPPZYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Ensure user is signed in anonymously before doing anything
signInAnonymously(auth)
  .then(() => {
    console.log("✅ Signed in anonymously (Firestore write access enabled)");
  })
  .catch((error) => {
    console.error("❌ Error signing in anonymously:", error);
  });

export { db, auth };
