import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// ✅ 6 NEW Unique Questions Per Sport
const questions = [
  // 🏀 Basketball
  { category: "classic_h2h", sport: "basketball", difficulty: "easy", question: "Who won the NBA MVP award in 2021?", options: ["Joel Embiid", "Giannis Antetokounmpo", "Nikola Jokic", "LeBron James"], correctAnswer: "Nikola Jokic" },
  { category: "classic_h2h", sport: "basketball", difficulty: "easy", question: "Which NBA player is nicknamed 'The King'?", options: ["Kevin Durant", "Kobe Bryant", "LeBron James", "Stephen Curry"], correctAnswer: "LeBron James" },
  { category: "classic_h2h", sport: "basketball", difficulty: "medium", question: "Which team did Allen Iverson play for in the 2001 NBA Finals?", options: ["Miami Heat", "Philadelphia 76ers", "Detroit Pistons", "Denver Nuggets"], correctAnswer: "Philadelphia 76ers" },
  { category: "classic_h2h", sport: "basketball", difficulty: "medium", question: "What college did Michael Jordan play for?", options: ["Duke", "North Carolina", "Kentucky", "UCLA"], correctAnswer: "North Carolina" },
  { category: "classic_h2h", sport: "basketball", difficulty: "hard", question: "Who holds the record for most steals in a single NBA game?", options: ["Allen Iverson", "Kendall Gill", "Chris Paul", "John Stockton"], correctAnswer: "Kendall Gill" },
  { category: "classic_h2h", sport: "basketball", difficulty: "hard", question: "Which NBA player once scored 8 points in 8.9 seconds?", options: ["Reggie Miller", "Ray Allen", "Dwyane Wade", "Tracy McGrady"], correctAnswer: "Reggie Miller" },

  // 🏈 Football
  { category: "classic_h2h", sport: "football", difficulty: "easy", question: "Which position does Patrick Mahomes play?", options: ["Running Back", "Wide Receiver", "Quarterback", "Tight End"], correctAnswer: "Quarterback" },
  { category: "classic_h2h", sport: "football", difficulty: "easy", question: "Which team won Super Bowl LV?", options: ["Buccaneers", "Chiefs", "Rams", "Patriots"], correctAnswer: "Buccaneers" },
  { category: "classic_h2h", sport: "football", difficulty: "medium", question: "Which team did Brett Favre retire with?", options: ["Green Bay Packers", "Minnesota Vikings", "New York Jets", "Atlanta Falcons"], correctAnswer: "Minnesota Vikings" },
  { category: "classic_h2h", sport: "football", difficulty: "medium", question: "Who was the NFL MVP in 2019?", options: ["Tom Brady", "Lamar Jackson", "Aaron Rodgers", "Patrick Mahomes"], correctAnswer: "Lamar Jackson" },
  { category: "classic_h2h", sport: "football", difficulty: "hard", question: "Which team was known as the 'Greatest Show on Turf'?", options: ["Patriots", "Cowboys", "Rams", "Colts"], correctAnswer: "Rams" },
  { category: "classic_h2h", sport: "football", difficulty: "hard", question: "Who was the first African-American quarterback to win a Super Bowl?", options: ["Doug Williams", "Patrick Mahomes", "Steve McNair", "Warren Moon"], correctAnswer: "Doug Williams" },

  // ⚾ Baseball
  { category: "classic_h2h", sport: "baseball", difficulty: "easy", question: "What team is known as the 'Bronx Bombers'?", options: ["Yankees", "Red Sox", "Dodgers", "Cubs"], correctAnswer: "Yankees" },
  { category: "classic_h2h", sport: "baseball", difficulty: "easy", question: "Who broke the single-season home run record in 2001?", options: ["Babe Ruth", "Barry Bonds", "Mark McGwire", "Sammy Sosa"], correctAnswer: "Barry Bonds" },
  { category: "classic_h2h", sport: "baseball", difficulty: "medium", question: "Which team won the 2016 World Series?", options: ["Cubs", "Indians", "Astros", "Red Sox"], correctAnswer: "Cubs" },
  { category: "classic_h2h", sport: "baseball", difficulty: "medium", question: "Which MLB player has the most hits in history?", options: ["Derek Jeter", "Ty Cobb", "Ichiro Suzuki", "Pete Rose"], correctAnswer: "Pete Rose" },
  { category: "classic_h2h", sport: "baseball", difficulty: "hard", question: "Who pitched a perfect game in the 2012 MLB season?", options: ["Roy Halladay", "Matt Cain", "Clayton Kershaw", "Felix Hernandez"], correctAnswer: "Matt Cain" },
  { category: "classic_h2h", sport: "baseball", difficulty: "hard", question: "What year did the Astros join the American League?", options: ["2011", "2013", "2015", "2017"], correctAnswer: "2013" },

  // ⚽ Soccer
  { category: "classic_h2h", sport: "soccer", difficulty: "easy", question: "Which country hosted the 2022 FIFA World Cup?", options: ["USA", "Qatar", "Brazil", "Germany"], correctAnswer: "Qatar" },
  { category: "classic_h2h", sport: "soccer", difficulty: "easy", question: "Which club does Lionel Messi currently play for (2024)?", options: ["Barcelona", "Inter Miami", "PSG", "Manchester City"], correctAnswer: "Inter Miami" },
  { category: "classic_h2h", sport: "soccer", difficulty: "medium", question: "Which player has the most Ballon d'Or awards?", options: ["Cristiano Ronaldo", "Lionel Messi", "Zidane", "Ronaldinho"], correctAnswer: "Lionel Messi" },
  { category: "classic_h2h", sport: "soccer", difficulty: "medium", question: "Which club is known as 'The Red Devils'?", options: ["Liverpool", "Arsenal", "Manchester United", "AC Milan"], correctAnswer: "Manchester United" },
  { category: "classic_h2h", sport: "soccer", difficulty: "hard", question: "Which country won the first ever FIFA World Cup?", options: ["Brazil", "Uruguay", "Italy", "Germany"], correctAnswer: "Uruguay" },
  { category: "classic_h2h", sport: "soccer", difficulty: "hard", question: "Who scored the 'Hand of God' goal?", options: ["Maradona", "Pele", "Messi", "Ronaldo"], correctAnswer: "Maradona" },

  // 🏒 Hockey
  { category: "classic_h2h", sport: "hockey", difficulty: "easy", question: "Which player is known as 'The Great One'?", options: ["Sidney Crosby", "Mario Lemieux", "Wayne Gretzky", "Alex Ovechkin"], correctAnswer: "Wayne Gretzky" },
  { category: "classic_h2h", sport: "hockey", difficulty: "easy", question: "What city are the Maple Leafs from?", options: ["Montreal", "Toronto", "Vancouver", "Ottawa"], correctAnswer: "Toronto" },
  { category: "classic_h2h", sport: "hockey", difficulty: "medium", question: "Which team won the Stanley Cup in 2023?", options: ["Lightning", "Avalanche", "Golden Knights", "Bruins"], correctAnswer: "Golden Knights" },
  { category: "classic_h2h", sport: "hockey", difficulty: "medium", question: "Who holds the record for most goals in a single NHL season?", options: ["Wayne Gretzky", "Brett Hull", "Alex Ovechkin", "Mario Lemieux"], correctAnswer: "Wayne Gretzky" },
  { category: "classic_h2h", sport: "hockey", difficulty: "hard", question: "Which goalie has the most shutouts in NHL history?", options: ["Patrick Roy", "Martin Brodeur", "Dominik Hasek", "Henrik Lundqvist"], correctAnswer: "Martin Brodeur" },
  { category: "classic_h2h", sport: "hockey", difficulty: "hard", question: "Which team was originally the 'Mighty Ducks'?", options: ["San Jose Sharks", "Anaheim Ducks", "Columbus Blue Jackets", "Florida Panthers"], correctAnswer: "Anaheim Ducks" },

  // 🎾 Tennis
  { category: "classic_h2h", sport: "tennis", difficulty: "easy", question: "Who has won the most Grand Slam titles in men's tennis?", options: ["Nadal", "Federer", "Djokovic", "Murray"], correctAnswer: "Djokovic" },
  { category: "classic_h2h", sport: "tennis", difficulty: "easy", question: "Which Grand Slam is played on grass?", options: ["Wimbledon", "US Open", "French Open", "Australian Open"], correctAnswer: "Wimbledon" },
  { category: "classic_h2h", sport: "tennis", difficulty: "medium", question: "Which player is known as the 'King of Clay'?", options: ["Federer", "Djokovic", "Murray", "Nadal"], correctAnswer: "Nadal" },
  { category: "classic_h2h", sport: "tennis", difficulty: "medium", question: "Which women's player won 23 Grand Slams?", options: ["Serena Williams", "Venus Williams", "Steffi Graf", "Martina Navratilova"], correctAnswer: "Serena Williams" },
  { category: "classic_h2h", sport: "tennis", difficulty: "hard", question: "Who was the first male player to win all four Grand Slams in one year?", options: ["Djokovic", "Federer", "Rod Laver", "Pete Sampras"], correctAnswer: "Rod Laver" },
  { category: "classic_h2h", sport: "tennis", difficulty: "hard", question: "Which Grand Slam is played on clay?", options: ["Australian Open", "US Open", "French Open", "Wimbledon"], correctAnswer: "French Open" },
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
