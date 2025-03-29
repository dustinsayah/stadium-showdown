import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// Delay helper to throttle writes
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Base player data
const basePlayers = [

        // 🏀 Basketball
        {
          name: "Jamal Murray",
          college: "Kentucky",
          teams: ["Nuggets"],
          draftPosition: "7th overall (2016)",
          difficulty: "easy",
          sport: "basketball"
        },
        {
          name: "Donovan Mitchell",
          college: "Louisville",
          teams: ["Jazz", "Cavaliers"],
          draftPosition: "13th overall (2017)",
          difficulty: "medium",
          sport: "basketball"
        },
        {
          name: "Jrue Holiday",
          college: "UCLA",
          teams: ["76ers", "Pelicans", "Bucks", "Celtics"],
          draftPosition: "17th overall (2009)",
          difficulty: "medium",
          sport: "basketball"
        },
        {
          name: "Kristaps Porziņģis",
          college: "International",
          teams: ["Knicks", "Mavericks", "Wizards", "Celtics"],
          draftPosition: "4th overall (2015)",
          difficulty: "medium",
          sport: "basketball"
        },
        {
          name: "Andrew Wiggins",
          college: "Kansas",
          teams: ["Timberwolves", "Warriors"],
          draftPosition: "1st overall (2014)",
          difficulty: "medium",
          sport: "basketball"
        },
        {
          name: "Harrison Barnes",
          college: "North Carolina",
          teams: ["Warriors", "Mavericks", "Kings"],
          draftPosition: "7th overall (2012)",
          difficulty: "hard",
          sport: "basketball"
        },
        {
          name: "CJ McCollum",
          college: "Lehigh",
          teams: ["Trail Blazers", "Pelicans"],
          draftPosition: "10th overall (2013)",
          difficulty: "medium",
          sport: "basketball"
        },
      
        // 🏈 Football
        {
          name: "Justin Fields",
          college: "Ohio State",
          teams: ["Bears"],
          draftPosition: "11th overall (2021)",
          difficulty: "easy",
          sport: "football"
        },
        {
          name: "A.J. Brown",
          college: "Ole Miss",
          teams: ["Titans", "Eagles"],
          draftPosition: "51st overall (2019)",
          difficulty: "medium",
          sport: "football"
        },
        {
          name: "Kyler Murray",
          college: "Oklahoma",
          teams: ["Cardinals"],
          draftPosition: "1st overall (2019)",
          difficulty: "medium",
          sport: "football"
        },
        {
          name: "Amari Cooper",
          college: "Alabama",
          teams: ["Raiders", "Cowboys", "Browns"],
          draftPosition: "4th overall (2015)",
          difficulty: "medium",
          sport: "football"
        },
        {
          name: "Derwin James",
          college: "Florida State",
          teams: ["Chargers"],
          draftPosition: "17th overall (2018)",
          difficulty: "medium",
          sport: "football"
        },
        {
          name: "Derrick Henry",
          college: "Alabama",
          teams: ["Titans"],
          draftPosition: "45th overall (2016)",
          difficulty: "easy",
          sport: "football"
        },
        {
          name: "Chandler Jones",
          college: "Syracuse",
          teams: ["Patriots", "Cardinals", "Raiders"],
          draftPosition: "21st overall (2012)",
          difficulty: "hard",
          sport: "football"
        },
      
        // ⚾ Baseball
        {
          name: "Corbin Burnes",
          college: "Saint Mary's",
          teams: ["Brewers", "Orioles"],
          draftPosition: "111th overall (2016)",
          difficulty: "medium",
          sport: "baseball"
        },
        {
          name: "Francisco Lindor",
          college: "None (High School)",
          teams: ["Guardians", "Mets"],
          draftPosition: "8th overall (2011)",
          difficulty: "medium",
          sport: "baseball"
        },
        {
          name: "Bo Bichette",
          college: "None (High School)",
          teams: ["Blue Jays"],
          draftPosition: "66th overall (2016)",
          difficulty: "medium",
          sport: "baseball"
        },
        {
          name: "Paul Goldschmidt",
          college: "Texas State",
          teams: ["Diamondbacks", "Cardinals"],
          draftPosition: "246th overall (2009)",
          difficulty: "medium",
          sport: "baseball"
        },
        {
          name: "Nolan Arenado",
          college: "None (High School)",
          teams: ["Rockies", "Cardinals"],
          draftPosition: "59th overall (2009)",
          difficulty: "medium",
          sport: "baseball"
        },
        {
          name: "Pete Alonso",
          college: "Florida",
          teams: ["Mets"],
          draftPosition: "64th overall (2016)",
          difficulty: "easy",
          sport: "baseball"
        },
        {
          name: "Corbin Carroll",
          college: "None (High School)",
          teams: ["Diamondbacks"],
          draftPosition: "16th overall (2019)",
          difficulty: "easy",
          sport: "baseball"
        }
      ];
      
          
      

// Builds randomized multiple-choice options per player
const buildOptions = (correctName, sameSportPlayers) => {
  const others = sameSportPlayers.filter((p) => p.name !== correctName);
  const randomChoices = others.sort(() => 0.5 - Math.random()).slice(0, 3);
  const all = [...randomChoices.map((p) => p.name), correctName];
  return all.sort(() => 0.5 - Math.random());
};

// Upload to Firestore
const addCareerPathPlayers = async () => {
  for (const player of basePlayers) {
    const sameSport = basePlayers.filter((p) => p.sport === player.sport);
    const playerWithOptions = {
      ...player,
      category: "career_path",
      options: buildOptions(player.name, sameSport)
    };

    try {
      await addDoc(collection(db, "questions"), playerWithOptions);
      console.log(`✅ Added: ${player.name}`);
    } catch (err) {
      console.error(`❌ Failed for ${player.name}:`, err.message);
    }

    // ⏱️ Delay between writes
    await delay(300);
  }

  console.log("🎉 All players added to Firestore.");
};

addCareerPathPlayers();
