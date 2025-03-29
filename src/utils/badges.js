const badges = [
  // 🎮 Game Milestones
  {
    id: "first-game",
    title: "First Game!",
    description: "Complete your first game.",
    condition: (ctx) => ctx.gamesPlayed >= 1,
  },
  {
    id: "ten-games",
    title: "Trivia Regular",
    description: "Play 10 games.",
    condition: (ctx) => ctx.gamesPlayed >= 10,
  },
  {
    id: "twentyfive-games",
    title: "Veteran",
    description: "Play 25 games.",
    condition: (ctx) => ctx.gamesPlayed >= 25,
  },
  {
    id: "fifty-games",
    title: "Grinding Machine",
    description: "Play 50 games.",
    condition: (ctx) => ctx.gamesPlayed >= 50,
  },

  // 🎯 Classic Trivia
  {
    id: "classic-easy-15",
    title: "Trivia Ace (Easy)",
    description: "Score 15/15 in Classic Trivia on Easy.",
    condition: (ctx) => (ctx.bestScores?.["classic_trivia-easy"] ?? 0) === 15,
  },
  {
    id: "classic-medium-12",
    title: "Trivia Champ (Medium)",
    description: "Score 12+ in Classic Trivia on Medium.",
    condition: (ctx) => (ctx.bestScores?.["classic_trivia-medium"] ?? 0) >= 12,
  },
  {
    id: "classic-hard-10",
    title: "Trivia Warrior (Hard)",
    description: "Score 10+ in Classic Trivia on Hard.",
    condition: (ctx) => (ctx.bestScores?.["classic_trivia-hard"] ?? 0) >= 10,
  },
  {
    id: "classic-3-difficulties",
    title: "Balanced Thinker",
    description: "Score 10+ in each Classic Trivia difficulty.",
    condition: (ctx) =>
      (ctx.bestScores?.["classic_trivia-easy"] ?? 0) >= 10 &&
      (ctx.bestScores?.["classic_trivia-medium"] ?? 0) >= 10 &&
      (ctx.bestScores?.["classic_trivia-hard"] ?? 0) >= 10,
  },
  {
    id: "classic-all-sports",
    title: "Sport Scholar",
    description: "Score 10+ in Classic Trivia for all 3 sports.",
    condition: (ctx) =>
      (ctx.bestScores?.["classic_trivia-football"] ?? 0) >= 10 &&
      (ctx.bestScores?.["classic_trivia-basketball"] ?? 0) >= 10 &&
      (ctx.bestScores?.["classic_trivia-baseball"] ?? 0) >= 10,
  },

  // 👤 Guess the Player
  {
    id: "guess-easy-25",
    title: "Player Scout (Easy)",
    description: "Score 25+ in Guess The Player (Easy).",
    condition: (ctx) => (ctx.bestScores?.["guess_the_player-easy"] ?? 0) >= 25,
  },
  {
    id: "guess-medium-30",
    title: "Name Game Pro (Medium)",
    description: "Score 30+ in Guess The Player (Medium).",
    condition: (ctx) => (ctx.bestScores?.["guess_the_player-medium"] ?? 0) >= 30,
  },
  {
    id: "guess-hard-35",
    title: "Legend Spotter (Hard)",
    description: "Score 35+ in Guess The Player (Hard).",
    condition: (ctx) => (ctx.bestScores?.["guess_the_player-hard"] ?? 0) >= 35,
  },
  {
    id: "guess-all-difficulties",
    title: "Guess Master",
    description: "Score 20+ on all difficulties in Guess The Player.",
    condition: (ctx) =>
      (ctx.bestScores?.["guess_the_player-easy"] ?? 0) >= 20 &&
      (ctx.bestScores?.["guess_the_player-medium"] ?? 0) >= 20 &&
      (ctx.bestScores?.["guess_the_player-hard"] ?? 0) >= 20,
  },
  {
    id: "guess-football-30",
    title: "QB Identifier",
    description: "Score 30+ in Guess The Player (Football).",
    condition: (ctx) => (ctx.bestScores?.["guess_the_player-football"] ?? 0) >= 30,
  },

  // ⚡ Rapid Fire
  {
    id: "rapid-15",
    title: "Fast Hands",
    description: "Score 15+ in Rapid Fire.",
    condition: (ctx) => (ctx.bestScores?.["rapid_fire-normal"] ?? 0) >= 15,
  },
  {
    id: "rapid-25",
    title: "Lightning Legend",
    description: "Score 25+ in Rapid Fire.",
    condition: (ctx) => (ctx.bestScores?.["rapid_fire-normal"] ?? 0) >= 25,
  },
  {
    id: "rapid-30",
    title: "Blazing Speed",
    description: "Score 30+ in Rapid Fire.",
    condition: (ctx) => (ctx.bestScores?.["rapid_fire-normal"] ?? 0) >= 30,
  },
  {
    id: "rapid-basketball-20",
    title: "Fast Break Master",
    description: "Score 20+ in Rapid Fire Basketball.",
    condition: (ctx) => (ctx.bestScores?.["rapid_fire-basketball"] ?? 0) >= 20,
  },
  {
    id: "rapid-streak-10",
    title: "Unstoppable",
    description: "10+ correct answers in a row in Rapid Fire.",
    condition: (ctx) => ctx.rapidFireStreak >= 10,
  },

  // 🧠 Ball Knowledge Test
  {
    id: "ball-score-80",
    title: "Elite Brain",
    description: "Score 80+ in Ball Knowledge Test.",
    condition: (ctx) => (ctx.bestScores?.["ball_knowledge-adaptive"] ?? 0) >= 80,
  },
  {
    id: "ball-score-90",
    title: "Ball Genius",
    description: "Score 90+ in Ball Knowledge Test.",
    condition: (ctx) => (ctx.bestScores?.["ball_knowledge-adaptive"] ?? 0) >= 90,
  },
  {
    id: "ball-multi-sport",
    title: "Knowledge Across Fields",
    description: "Score 75+ in Ball Knowledge Test with multiple sports selected.",
    condition: (ctx) => (ctx.ballKnowledgeMultiSport ?? false),
  },
  {
    id: "ball-fast-thinker",
    title: "Speedy Brain",
    description: "Score 70+ with an average response time < 7s.",
    condition: (ctx) => (ctx.ballKnowledgeTimeAvg ?? 99) < 7,
  },
  {
    id: "ball-min-score",
    title: "Tough Lesson",
    description: "Score under 40 in Ball Knowledge Test.",
    condition: (ctx) => (ctx.bestScores?.["ball_knowledge-adaptive"] ?? 100) < 40,
  },

  // 🛣️ Career Path
  {
    id: "career-perfect",
    title: "Path Master",
    description: "Score 30/30 in Career Path mode.",
    condition: (ctx) => (ctx.bestScores?.["career_path-easy"] ?? 0) === 30,
  },
  {
    id: "career-hard-25",
    title: "Pathfinder (Hard)",
    description: "Score 25+ in Career Path Hard mode.",
    condition: (ctx) => (ctx.bestScores?.["career_path-hard"] ?? 0) >= 25,
  },
  {
    id: "career-medium-20",
    title: "Journey Expert (Medium)",
    description: "Score 20+ in Career Path Medium mode.",
    condition: (ctx) => (ctx.bestScores?.["career_path-medium"] ?? 0) >= 20,
  },
  {
    id: "career-football",
    title: "Draft Scout",
    description: "Score 20+ in Career Path (Football).",
    condition: (ctx) => (ctx.bestScores?.["career_path-football"] ?? 0) >= 20,
  },
  {
    id: "career-basketball",
    title: "College Tracker",
    description: "Score 20+ in Career Path (Basketball).",
    condition: (ctx) => (ctx.bestScores?.["career_path-basketball"] ?? 0) >= 20,
  },

  // 🏅 Profile
  {
    id: "set-username",
    title: "Name Claimed",
    description: "Set a username.",
    condition: (ctx) => !!ctx.username,
  },
  {
    id: "set-avatar",
    title: "Face Revealed",
    description: "Pick an avatar.",
    condition: (ctx) => !!ctx.avatarURL,
  },
  {
    id: "avatar-master",
    title: "Style Icon",
    description: "Change your avatar 3+ times.",
    condition: (ctx) => ctx.avatarChangeCount >= 3,
  },

  // 🧱 Global
  {
    id: "all-modes",
    title: "Game Explorer",
    description: "Play each game mode at least once.",
    condition: (ctx) =>
      ["classic_trivia", "guess_the_player", "rapid_fire", "ball_knowledge", "career_path"].every(
        (m) => ctx.modesPlayed?.has(m)
      ),
  },
  {
    id: "ultra-player",
    title: "Ultimate Trivia Beast",
    description: "Earn 30 different badges.",
    condition: (ctx) => (ctx.earnedBadges?.length ?? 0) >= 30,
  }
];

export default badges;
