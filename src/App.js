import React from "react";
import { Routes, Route } from "react-router-dom";

// 🏠 Core Pages
import Home from "./components/Home";
import ClassicTrivia from "./components/ClassicTrivia";
import TriviaGame from "./components/TriviaGame";
import TriviaEnd from "./components/TriviaEnd";
import RapidFire from "./components/RapidFire";
import H2HGame from "./components/H2HGame";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import EndScreen from "./components/EndScreen";
import GuessPlayerSetup from "./components/GuessPlayerSetup";
import GuessThePlayer from "./components/GuessThePlayer";
import WeeklyChallenge from "./components/WeeklyChallenge";

// 🧠 New Game Modes
import BallKnowledgeSetup from "./components/BallKnowledgeSetup";
import BallKnowledgeGame from "./components/BallKnowledgeGame";
import BallKnowledgeEnd from "./components/BallKnowledgeEnd";
import CareerPathSetup from "./components/CareerPathSetup";
import CareerPathGame from "./components/CareerPathGame";
import CareerPathEnd from "./components/CareerPathEnd";

// ⚙️ Utility Pages
import HowToPlay from "./components/HowToPlay";
import AdminFixTools from "./components/AdminFixTools";
import AvatarSetup from "./components/AvatarSetup";
import Leaderboard from "./components/Leaderboard";
import PrivacyPolicy from "./components/PrivacyPolicy";

// 👤 Profile
import Profile from "./components/Profile";

// 🪧 Adcash
import AdcashLoader from "./components/AdcashLoader";

function App() {
  return (
    <>
      <AdcashLoader /> {/* ✅ Inject Adcash script */}
      <Routes>
        {/* 🏠 Home */}
        <Route path="/" element={<Home />} />

        {/* 🎯 Classic Trivia */}
        <Route path="/classic-trivia" element={<ClassicTrivia />} />
        <Route path="/classic-trivia/game" element={<TriviaGame />} />
        <Route path="/classic-trivia/end" element={<TriviaEnd />} />

        {/* ⚡ Rapid Fire */}
        <Route path="/rapid-fire" element={<RapidFire />} />

        {/* 🤼 Head-to-Head */}
        <Route path="/create-h2h" element={<CreateGame />} />
        <Route path="/join-h2h" element={<JoinGame />} />
        <Route path="/h2h/:gameCode" element={<H2HGame />} />
        <Route path="/h2h-end" element={<EndScreen />} />

        {/* 👤 Guess the Player */}
        <Route path="/guessplayer" element={<GuessPlayerSetup />} />
        <Route path="/guessplayer/game" element={<GuessThePlayer />} />

        {/* 📅 Weekly Challenge */}
        <Route path="/weekly-challenge" element={<WeeklyChallenge />} />

        {/* 🧠 Ball Knowledge AI Mode */}
        <Route path="/ball-knowledge" element={<BallKnowledgeSetup />} />
        <Route path="/ball-knowledge/game" element={<BallKnowledgeGame />} />
        <Route path="/ball-knowledge/end" element={<BallKnowledgeEnd />} />

        {/* 🛣️ Career Path Mode */}
        <Route path="/career-path/setup" element={<CareerPathSetup />} />
        <Route path="/career-path/game" element={<CareerPathGame />} />
        <Route path="/career-path/end" element={<CareerPathEnd />} />

        {/* ⚙️ Info Pages */}
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/admin-fix" element={<AdminFixTools />} />
        <Route path="/avatar-setup" element={<AvatarSetup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* 🏆 Extras */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
