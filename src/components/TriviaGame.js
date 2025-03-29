import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "./ClassicTrivia.css";

const ClassicTrivia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSports, difficulty } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedSports || selectedSports.length === 0) {
        console.error("❌ No sports selected! Cannot fetch questions.");
        setLoading(false);
        return;
      }

      try {
        console.log("🔍 Fetching questions for:", {
          category: "classic_h2h",
          sports: selectedSports,
          difficulty: difficulty,
        });

        const q = query(
          collection(db, "questions"),
          where("category", "==", "classic_h2h"),
          where("sport", "in", selectedSports), // ✅ Ensure sports exist
          where("difficulty", "==", difficulty) // ✅ Ensure difficulty matches
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedQuestions = querySnapshot.docs.map((doc) => doc.data()).slice(0, 15);
          console.log("✅ Questions Retrieved:", fetchedQuestions);
          setQuestions(fetchedQuestions);
        } else {
          console.error("❌ No questions found in Firestore!");
        }
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedSports, difficulty]);

  if (loading) return <h2>Loading questions...</h2>;
  if (questions.length === 0) return <h2>❌ No questions found. Check Firebase.</h2>;

  return (
    <motion.div
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="progress">Question {currentQuestionIndex + 1} / 15</h2>
      <h1 className="game-question">{questions[currentQuestionIndex].question}</h1>
    </motion.div>
  );
};

export default ClassicTrivia;
