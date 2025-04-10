import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// ✅ 6 NEW Unique Questions Per Sport
const questions = [

    // 🏀 Basketball
    { category: "classic_h2h", sport: "basketball", difficulty: "easy", question: "Who won the NBA Rookie of the Year in 2023?", options: ["Jalen Green", "Scottie Barnes", "Paolo Banchero", "Cade Cunningham"], correctAnswer: "Paolo Banchero" },
    { category: "classic_h2h", sport: "basketball", difficulty: "easy", question: "Which NBA team plays at Madison Square Garden?", options: ["Nets", "Lakers", "Knicks", "Celtics"], correctAnswer: "Knicks" },
    { category: "classic_h2h", sport: "basketball", difficulty: "medium", question: "Which NBA player is known as 'The Claw'?", options: ["Kawhi Leonard", "Jimmy Butler", "Paul George", "Giannis Antetokounmpo"], correctAnswer: "Kawhi Leonard" },
    { category: "classic_h2h", sport: "basketball", difficulty: "medium", question: "Which team drafted Luka Dončić before trading him to Dallas?", options: ["Hawks", "Suns", "Kings", "Magic"], correctAnswer: "Hawks" },
    { category: "classic_h2h", sport: "basketball", difficulty: "hard", question: "Who was the shortest player to ever play in the NBA?", options: ["Nate Robinson", "Spud Webb", "Earl Boykins", "Muggsy Bogues"], correctAnswer: "Muggsy Bogues" },
    { category: "classic_h2h", sport: "basketball", difficulty: "hard", question: "Which NBA coach has the most career wins?", options: ["Gregg Popovich", "Phil Jackson", "Don Nelson", "Red Auerbach"], correctAnswer: "Don Nelson" },
  
    // 🏈 Football
    { category: "classic_h2h", sport: "football", difficulty: "easy", question: "Which NFL team is based in Dallas?", options: ["Texans", "Cowboys", "Titans", "Giants"], correctAnswer: "Cowboys" },
    { category: "classic_h2h", sport: "football", difficulty: "easy", question: "Who is known for the 'Grit and Grind' run game?", options: ["Titans", "Ravens", "Browns", "Falcons"], correctAnswer: "Titans" },
    { category: "classic_h2h", sport: "football", difficulty: "medium", question: "Who caught the 'Helmet Catch' in Super Bowl XLII?", options: ["Victor Cruz", "Hakeem Nicks", "David Tyree", "Plaxico Burress"], correctAnswer: "David Tyree" },
    { category: "classic_h2h", sport: "football", difficulty: "medium", question: "Which QB did the 49ers draft in 2021?", options: ["Trey Lance", "Jimmy Garoppolo", "Sam Darnold", "Zach Wilson"], correctAnswer: "Trey Lance" },
    { category: "classic_h2h", sport: "football", difficulty: "hard", question: "Who was the MVP of Super Bowl LVI?", options: ["Joe Burrow", "Aaron Donald", "Matthew Stafford", "Cooper Kupp"], correctAnswer: "Cooper Kupp" },
    { category: "classic_h2h", sport: "football", difficulty: "hard", question: "Which NFL team has never appeared in a Super Bowl?", options: ["Lions", "Browns", "Texans", "All of the above"], correctAnswer: "All of the above" },
  
    // ⚾ Baseball
    { category: "classic_h2h", sport: "baseball", difficulty: "easy", question: "Which MLB team plays at Fenway Park?", options: ["Red Sox", "Yankees", "Blue Jays", "Mets"], correctAnswer: "Red Sox" },
    { category: "classic_h2h", sport: "baseball", difficulty: "easy", question: "Who is the face of MLB The Show 2023?", options: ["Aaron Judge", "Shohei Ohtani", "Mookie Betts", "Juan Soto"], correctAnswer: "Shohei Ohtani" },
    { category: "classic_h2h", sport: "baseball", difficulty: "medium", question: "Which pitcher threw a no-hitter in his final home start in 2023?", options: ["Justin Verlander", "Clayton Kershaw", "Adam Wainwright", "Max Scherzer"], correctAnswer: "Adam Wainwright" },
    { category: "classic_h2h", sport: "baseball", difficulty: "medium", question: "What team moved to Washington to become the Nationals?", options: ["Expos", "Senators", "Rays", "Marlins"], correctAnswer: "Expos" },
    { category: "classic_h2h", sport: "baseball", difficulty: "hard", question: "Which player had 7 home runs in a single postseason series?", options: ["Carlos Beltrán", "David Ortiz", "Corey Seager", "Randy Arozarena"], correctAnswer: "Randy Arozarena" },
    { category: "classic_h2h", sport: "baseball", difficulty: "hard", question: "Who holds the record for most career strikeouts?", options: ["Nolan Ryan", "Randy Johnson", "Roger Clemens", "Pedro Martinez"], correctAnswer: "Nolan Ryan" },
  
    // ⚽ Soccer
    { category: "classic_h2h", sport: "soccer", difficulty: "easy", question: "Which club plays at Old Trafford?", options: ["Arsenal", "Chelsea", "Manchester United", "Man City"], correctAnswer: "Manchester United" },
    { category: "classic_h2h", sport: "soccer", difficulty: "easy", question: "Which country won the Women's World Cup in 2019?", options: ["England", "France", "USA", "Germany"], correctAnswer: "USA" },
    { category: "classic_h2h", sport: "soccer", difficulty: "medium", question: "Who scored the winning penalty in the 2022 World Cup Final?", options: ["Messi", "Mbappé", "Martínez", "Montiel"], correctAnswer: "Montiel" },
    { category: "classic_h2h", sport: "soccer", difficulty: "medium", question: "What country is Erling Haaland from?", options: ["Sweden", "Norway", "Denmark", "Germany"], correctAnswer: "Norway" },
    { category: "classic_h2h", sport: "soccer", difficulty: "hard", question: "Who won the Champions League in 2004?", options: ["Barcelona", "Milan", "Porto", "Chelsea"], correctAnswer: "Porto" },
    { category: "classic_h2h", sport: "soccer", difficulty: "hard", question: "Which nation has never won a World Cup?", options: ["Brazil", "Netherlands", "Italy", "Argentina"], correctAnswer: "Netherlands" },
  
    // 🏒 Hockey
    { category: "classic_h2h", sport: "hockey", difficulty: "easy", question: "Which team won the Stanley Cup in 2021?", options: ["Lightning", "Canadiens", "Bruins", "Avalanche"], correctAnswer: "Lightning" },
    { category: "classic_h2h", sport: "hockey", difficulty: "easy", question: "Which player wears #8 for the Capitals?", options: ["Sidney Crosby", "Auston Matthews", "Alex Ovechkin", "Nathan MacKinnon"], correctAnswer: "Alex Ovechkin" },
    { category: "classic_h2h", sport: "hockey", difficulty: "medium", question: "Which goalie won the Vezina Trophy in 2022?", options: ["Shesterkin", "Vasilevskiy", "Saros", "Fleury"], correctAnswer: "Shesterkin" },
    { category: "classic_h2h", sport: "hockey", difficulty: "medium", question: "What is the name of Seattle's NHL team?", options: ["Kraken", "Whalers", "Jets", "Thunder"], correctAnswer: "Kraken" },
    { category: "classic_h2h", sport: "hockey", difficulty: "hard", question: "Which team drafted Connor Bedard?", options: ["Coyotes", "Canucks", "Blackhawks", "Flyers"], correctAnswer: "Blackhawks" },
    { category: "classic_h2h", sport: "hockey", difficulty: "hard", question: "Who was the NHL scoring leader in 2022-23?", options: ["Connor McDavid", "Leon Draisaitl", "David Pastrnak", "Jason Robertson"], correctAnswer: "Connor McDavid" },
  
    // 🎾 Tennis
    { category: "classic_h2h", sport: "tennis", difficulty: "easy", question: "What nationality is Rafael Nadal?", options: ["Swiss", "Spanish", "Serbian", "American"], correctAnswer: "Spanish" },
    { category: "classic_h2h", sport: "tennis", difficulty: "easy", question: "How many sets are in a Grand Slam mens match?", options: ["3", "4", "5", "6"], correctAnswer: "5" },
    { category: "classic_h2h", sport: "tennis", difficulty: "medium", question: "Who won the US Open in 2021 (Men)?", options: ["Medvedev", "Djokovic", "Thiem", "Alcaraz"], correctAnswer: "Medvedev" },
    { category: "classic_h2h", sport: "tennis", difficulty: "medium", question: "Who is the youngest male Grand Slam winner?", options: ["Nadal", "Becker", "Borg", "Wilander"], correctAnswer: "Becker" },
    { category: "classic_h2h", sport: "tennis", difficulty: "hard", question: "Who won Wimbledon Women’s Singles in 2023?", options: ["Swiatek", "Rybakina", "Sabalenka", "Vondrousova"], correctAnswer: "Vondrousova" },
    { category: "classic_h2h", sport: "tennis", difficulty: "hard", question: "Which male player won a Career Golden Slam?", options: ["Nadal", "Federer", "Djokovic", "Agassi"], correctAnswer: "Agassi" },
  ];
  




// 🔥 Function to Add Questions to Firestore with Delay
const addQuestionsToFirebase = async () => {
  for (const question of questions) {
    try {
      await addDoc(collection(db, "questions"), question);
      console.log(`✅ Question added: ${question.question}`);
      await new Promise((resolve) => setTimeout(resolve, 500)); // ⏳ Short delay
    } catch (error) {
      console.error(`❌ Error adding question: ${error.message}`);
    }
  }
};

// 🔥 Run the function
addQuestionsToFirebase();
