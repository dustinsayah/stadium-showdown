import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HowToPlay.css";

const HowToPlay = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="how-to-play-container"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h1>📘 How to Play</h1>

      <section>
        <h2>🎯 Classic Trivia</h2>
        <ul>
          <li>Select your favorite sports and a difficulty level.</li>
          <li>Answer 15 multiple-choice questions.</li>
          <li>Score 1 point for every correct answer.</li>
        </ul>
      </section>

      <section>
        <h2>⚡ Rapid Fire</h2>
        <ul>
          <li>You have 30 seconds to answer as many questions as possible.</li>
          <li>Each correct answer gives you 1 point.</li>
          <li>No penalty for wrong answers — just go fast!</li>
        </ul>
      </section>

      <section>
        <h2>👤 Guess the Player</h2>
        <ul>
          <li>Try to guess the player with up to 4 hints:</li>
          <li>Blurred Image (5 pts), Position (3 pts), Team (2 pts), Unblurred Image (1 pt).</li>
          <li>Type their name to score points!</li>
        </ul>
      </section>

      <section>
        <h2>🤼 Head-to-Head</h2>
        <ul>
          <li>Invite a friend or join a game using a code.</li>
          <li>Each player gets the same questions.</li>
          <li>First player to reach 10 correct answers wins.</li>
        </ul>
      </section>

      <section>
        <h2>🧠 Ball Knowledge Test</h2>
        <ul>
          <li>Select your sports and get a mix of questions with adaptive difficulty.</li>
          <li>The AI adjusts question difficulty based on your performance.</li>
          <li>Final score is out of 100, based on accuracy, difficulty, and response speed.</li>
        </ul>
      </section>

      <section>
        <h2>🛣️ Career Path</h2>
        <ul>
          <li>Guess the player based on their college, career path, and draft info.</li>
          <li>Type their name for 3 points. If wrong, select from 4 options for 1 point.</li>
          <li>Play through 10 rounds and try to score up to 30 points!</li>
        </ul>
      </section>

      <section>
        <h2>📅 Weekly Challenge</h2>
        <ul>
          <li>Each week features a new hand-picked challenge with a leaderboard.</li>
          <li>Only one chance per week to post your best score!</li>
        </ul>
      </section>

      <button onClick={() => navigate("/")}>🏠 Back to Home</button>
    </motion.div>
  );
};

export default HowToPlay;
