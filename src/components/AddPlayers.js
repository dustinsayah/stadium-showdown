import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxx",
  authDomain: "stadium-showdown.firebaseapp.com",
  projectId: "stadium-showdown",
  storageBucket: "stadium-showdown.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 21 NBA Players (7 Easy, 7 Medium, 7 Hard)


const players = [
  {
    name: "Shohei Ohtani",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Los Angeles Dodgers",
    position: "DH",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39832.png&w=350&h=254"
  },
  {
    name: "Aaron Judge",
    sport: "Baseball",
    difficulty: "Easy",
    team: "New York Yankees",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33192.png&w=350&h=254"
  },
  {
    name: "Ronald Acuña Jr.",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Atlanta Braves",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/36185.png&w=350&h=254"
  },
  {
    name: "Mookie Betts",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Los Angeles Dodgers",
    position: "2B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33039.png&w=350&h=254"
  },
  {
    name: "Fernando Tatis Jr.",
    sport: "Baseball",
    difficulty: "Easy",
    team: "San Diego Padres",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/35983.png&w=350&h=254"
  },
  {
    name: "Juan Soto",
    sport: "Baseball",
    difficulty: "Easy",
    team: "New York Mets",
    position: "LF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/36969.png&w=350&h=254"
  },
  {
    name: "Freddie Freeman",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Los Angeles Dodgers",
    position: "1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30193.png&w=350&h=254"
  },
  {
    name: "Bryce Harper",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Philadelphia Phillies",
    position: "1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30951.png&w=350&h=254"
  },
  {
    name: "Mike Trout",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Los Angeles Angels",
    position: "CF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30836.png&w=350&h=254"
  },
  {
    name: "Vladimir Guerrero Jr.",
    sport: "Baseball",
    difficulty: "Easy",
    team: "Toronto Blue Jays",
    position: "1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/35002.png&w=350&h=254"
  },
  {
    name: "Pete Alonso",
    sport: "Baseball",
    difficulty: "Medium",
    team: "New York Mets",
    position: "1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/37498.png&w=350&h=254"
  },
  {
    name: "Bo Bichette",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Toronto Blue Jays",
    position: "SS",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/38904.png&w=350&h=254"
  },
  {
    name: "Matt Olson",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Atlanta Braves",
    position: "1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32767.png&w=350&h=254"
  },
  {
    name: "Alex Bregman",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Boston Red Sox",
    position: "3B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/34886.png&w=350&h=254"
  },
  {
    name: "Austin Riley",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Atlanta Braves",
    position: "3B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/34982.png&w=350&h=254"
  },
  {
    name: "Luis Robert Jr.",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Chicago White Sox",
    position: "CF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39631.png&w=350&h=254"
  },
  {
    name: "Julio Rodríguez",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Seattle Mariners",
    position: "CF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/41044.png&w=350&h=254"
  },
  {
    name: "Corey Seager",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Texas Rangers",
    position: "SS",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32691.png&w=350&h=254"
  },
  {
    name: "Kyle Tucker",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Chicago Cubs",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/34967.png&w=350&h=254"
  },
  {
    name: "Teoscar Hernández",
    sport: "Baseball",
    difficulty: "Medium",
    team: "Los Angeles Dodgers",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33377.png&w=350&h=254"
  },
  {
    name: "Ketel Marte",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Arizona Diamondbacks",
    position: "2B/CF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32512.png&w=350&h=254"
  },
  {
    name: "Tommy Edman",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Los Angeles Dodgers",
    position: "2B/SS",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39907.png&w=350&h=254"
  },
  {
    name: "Mark Canha",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Kansas City Royals",
    position: "OF/1B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31670.png&w=350&h=254"
  },
  {
    name: "Kolten Wong",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Baltimore Orioles",
    position: "2B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32061.png&w=350&h=254"
  },
  {
    name: "Mitch Haniger",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Seattle Mariners",
    position: "RF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32771.png&w=350&h=254"
  },
  {
    name: "Jonathan Schoop",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Detroit Tigers",
    position: "2B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31988.png&w=350&h=254"
  },
  {
    name: "Robbie Grossman",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Kansas City Royals",
    position: "LF",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31385.png&w=350&h=254"
  },
  {
    name: "César Hernández",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Detroit Tigers",
    position: "2B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31130.png&w=350&h=254"
  },
  {
    name: "José Iglesias",
    sport: "Baseball",
    difficulty: "Hard",
    team: "San Diego Padres",
    position: "SS",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30382.png&w=350&h=254"
  },
  {
    name: "Adam Frazier",
    sport: "Baseball",
    difficulty: "Hard",
    team: "Pittsburgh Pirates",
    position: "2B",
    image: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33546.png&w=350&h=254"
  }
];
  
    



  


// Upload to Firestore
const uploadPlayers = async () => {
  const playersRef = collection(db, 'players');

  for (const player of players) {
    try {
      await addDoc(playersRef, player);
      console.log(`✅ Added: ${player.name}`);
    } catch (error) {
      console.error(`❌ Error adding ${player.name}:`, error);
    }
  }
};

uploadPlayers();
