// src/utils/badgeHelpers.js

export function buildBadgeContext(entries, username, avatarURL) {
    const bestScores = {};
    const modesPlayed = new Set();
    const sportCounts = {};
    let totalXp = 0;
    let classicCorrect = 0;
    let classicTotal = 0;
    let lastPlayedHour = null;
  
    entries.forEach((entry) => {
      const key = `${entry.mode}-${entry.difficulty}`;
      if (!bestScores[key] || entry.score > bestScores[key]) {
        bestScores[key] = entry.score;
      }
  
      // Sport-specific badge tracking
      if (entry.sport) {
        const sport = entry.sport.toLowerCase();
        sportCounts[sport] = (sportCounts[sport] || 0) + 1;
      }
  
      // Accuracy calc for classic trivia
      if (entry.mode === "classic_trivia") {
        classicCorrect += entry.score;
        classicTotal += 15;
      }
  
      modesPlayed.add(entry.mode);
      totalXp += entry.score;
  
      // Last played hour (for night owl)
      if (!lastPlayedHour && entry.createdAt?.toDate) {
        const date = entry.createdAt.toDate();
        lastPlayedHour = date.getHours();
      }
    });
  
    const classicAccuracy = classicTotal > 0 ? classicCorrect / classicTotal : 0;
  
    return {
      username,
      avatarURL,
      gamesPlayed: entries.length,
      bestScores,
      xp: totalXp,
      modesPlayed,
      classicAccuracy,
      sportCounts,
      lastPlayedHour,
    };
  }
  