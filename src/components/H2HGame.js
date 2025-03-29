import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EndScreen from "./EndScreen";
import "./H2HGame.css";


const H2HGame = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();

  const [gameData, setGameData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  // ✅ Get game data and assign player number
  useEffect(() => {
    const fetchGame = async () => {
      console.log("🔍 Fetching game data...");
      const q = query(collection(db, "head_to_head_games"), where("gameCode", "==", gameCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const gameDoc = querySnapshot.docs[0];
        let gameData = { id: gameDoc.id, ...gameDoc.data() };

        if (!gameData.player1) gameData.player1 = { name: "Player 1", score: 0, answered: false };
        if (!gameData.player2) gameData.player2 = { name: "Player 2", score: 0, answered: false };

        setGameData(gameData);

        if (!gameData.player1.name) {
          await updateDoc(doc(db, "head_to_head_games", gameDoc.id), {
            "player1.name": "Player 1",
            "player1.score": 0,
            "player1.answered": false,
          });
          setPlayerNumber(1);
        } else if (!gameData.player2.name) {
          await updateDoc(doc(db, "head_to_head_games", gameDoc.id), {
            "player2.name": "Player 2",
            "player2.score": 0,
            "player2.answered": false,
            status: "in-progress",
          });
          setPlayerNumber(2);
        }
      } else {
        alert("Invalid game code.");
        navigate("/");
      }
    };

    fetchGame();

    const unsubscribe = onSnapshot(
      query(collection(db, "head_to_head_games"), where("gameCode", "==", gameCode)),
      (snapshot) => {
        if (!snapshot.empty) {
          const gameDoc = snapshot.docs[0];
          const updatedGameData = { id: gameDoc.id, ...gameDoc.data() };

          if (!updatedGameData.player1)
            updatedGameData.player1 = { name: "Player 1", score: 0, answered: false };
          if (!updatedGameData.player2)
            updatedGameData.player2 = { name: "Player 2", score: 0, answered: false };

          setGameData(updatedGameData);

          // ✅ Move to next question if both players answered
          if (updatedGameData.player1.answered && updatedGameData.player2.answered) {
            handleNextQuestion(updatedGameData);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [gameCode, navigate]);

  // ✅ Fetch question using normalized lowercase sport values
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!gameData || !Array.isArray(gameData.sports) || gameData.sports.length === 0) {
        console.error("❌ No valid sports selected. Cannot fetch questions.");
        return;
      }

      // ✅ Normalize sports to lowercase
      const normalizedSports = gameData.sports.map((sport) => sport.toLowerCase());

      console.log("🔍 Fetching questions for:", {
        category: "classic_h2h",
        sport: normalizedSports,
        difficulty: gameData.difficulty,
      });

      try {
        const q = query(
          collection(db, "questions"),
          where("category", "==", "classic_h2h"),
          where("sport", "in", normalizedSports),
          where("difficulty", "==", gameData.difficulty)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.error("❌ No questions found.");
          return;
        }

        const questions = querySnapshot.docs.map((doc) => doc.data());
        console.log("✅ Questions retrieved:", questions);
        setCurrentQuestion(questions[gameData.currentQuestionIndex]);
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      }
    };

    if (gameData) {
      fetchQuestion();
    }
  }, [gameData]);

  const handleAnswer = async (answer) => {
    if (!gameData || !currentQuestion || selectedAnswer) return;

    setSelectedAnswer(answer);
    setWaitingForOpponent(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    const playerField = playerNumber === 1 ? "player1" : "player2";

    const scoreField = `${playerField}.score`;
    const answeredField = `${playerField}.answered`;

    const currentScore = gameData[playerField]?.score ?? 0;
    const updatedScore = isCorrect ? currentScore + 1 : currentScore;

    await updateDoc(doc(db, "head_to_head_games", gameData.id), {
      [scoreField]: updatedScore,
      [answeredField]: true,
    });

    // ✅ End game if score reaches 10
    if (updatedScore >= 10) {
      await updateDoc(doc(db, "head_to_head_games", gameData.id), { status: "finished" });
    }
  };

  const handleNextQuestion = async (updatedGameData) => {
    if (!updatedGameData || !updatedGameData.id) return;

    console.log("🔄 Moving to next question...");
    setSelectedAnswer(null);
    setWaitingForOpponent(false);

    await updateDoc(doc(db, "head_to_head_games", updatedGameData.id), {
      currentQuestionIndex: updatedGameData.currentQuestionIndex + 1,
      "player1.answered": false,
      "player2.answered": false,
    });
  };

  if (!gameData) return <h2>Loading game...</h2>;

  if (gameData.status === "finished") {
    return (
      <EndScreen
        player1Score={gameData.player1?.score ?? 0}
        player2Score={gameData.player2?.score ?? 0}
        playerNumber={playerNumber}
      />
    );
  }

  const opponentField = playerNumber === 1 ? "player2" : "player1";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h2h-container"
    >
      <h1 className="game-title">🏆 Head-to-Head Battle 🏆</h1>
      <h2 className="game-code">Game Code: {gameCode}</h2>

      <h3 className="score">You: {gameData[`player${playerNumber}`]?.score ?? 0}</h3>
      <h3 className="score">Opponent: {gameData[opponentField]?.score ?? 0}</h3>

      {waitingForOpponent ? (
        <h2 className="waiting-text">Waiting for opponent to answer...</h2>
      ) : currentQuestion ? (
        <motion.div className="question-box">
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className="answer-button"
            >
              {option}
            </button>
          ))}
        </motion.div>
      ) : (
        <h2 className="no-questions">No questions found. Check Firebase.</h2>
      )}
    </motion.div>
  );
};

export default H2HGame;
