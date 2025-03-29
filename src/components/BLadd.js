import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

const questions = [
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "basketball",
    question: "Which team drafted Stephen Curry?",
    options: ["Lakers", "Bulls", "Warriors", "Knicks"],
    correctAnswer: "Warriors"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "football",
    question: "Which team does Patrick Mahomes play for?",
    options: ["Cowboys", "Chiefs", "Packers", "Ravens"],
    correctAnswer: "Chiefs"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "baseball",
    question: "How many outs are in an inning (both teams combined)?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "6"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "basketball",
    question: "How many points is a three-pointer worth?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "football",
    question: "What position throws the football?",
    options: ["Running Back", "Quarterback", "Linebacker", "Receiver"],
    correctAnswer: "Quarterback"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level1",
    sport: "baseball",
    question: "What do you call it when the batter hits the ball out of the park?",
    options: ["Triple", "Walk", "Home Run", "Bunt"],
    correctAnswer: "Home Run"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "football",
    question: "How many points is a touchdown worth?",
    options: ["3", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "basketball",
    question: "Who holds the record for most career points in the NBA?",
    options: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Karl Malone"],
    correctAnswer: "LeBron James"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "baseball",
    question: "How many players are on the field for each baseball team?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "football",
    question: "Which team won Super Bowl 50?",
    options: ["Patriots", "Broncos", "Seahawks", "Panthers"],
    correctAnswer: "Broncos"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "basketball",
    question: "What is Shaquille O'Neal's nickname?",
    options: ["The Answer", "The Truth", "Big Diesel", "The King"],
    correctAnswer: "Big Diesel"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level2",
    sport: "baseball",
    question: "What is a 'grand slam' in baseball?",
    options: ["4 consecutive hits", "Homerun with 3 men on base", "3 strikes", "4 stolen bases"],
    correctAnswer: "Homerun with 3 men on base"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "football",
    question: "Who has the most career rushing yards in NFL history?",
    options: ["Walter Payton", "Barry Sanders", "Emmitt Smith", "Adrian Peterson"],
    correctAnswer: "Emmitt Smith"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "basketball",
    question: "Which player won back-to-back MVPs in 2019 and 2020?",
    options: ["LeBron James", "Giannis Antetokounmpo", "Jokic", "KD"],
    correctAnswer: "Giannis Antetokounmpo"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "baseball",
    question: "Which player broke the MLB single-season HR record in 2001?",
    options: ["Mark McGwire", "Sammy Sosa", "Barry Bonds", "Aaron Judge"],
    correctAnswer: "Barry Bonds"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "football",
    question: "Which QB was drafted 1st overall in 2020?",
    options: ["Joe Burrow", "Justin Herbert", "Tua Tagovailoa", "Jordan Love"],
    correctAnswer: "Joe Burrow"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "basketball",
    question: "Which NBA team had a 73 and 9 record?",
    options: ["Lakers", "Celtics", "Bulls", "Warriors"],
    correctAnswer: "Warriors"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level3",
    sport: "baseball",
    question: "Which pitcher threw a perfect game in 2012?",
    options: ["Justin Verlander", "Matt Cain", "Max Scherzer", "Roy Halladay"],
    correctAnswer: "Matt Cain"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "football",
    question: "Who was the MVP of Super Bowl XLVIII?",
    options: ["Russell Wilson", "Malcolm Smith", "Peyton Manning", "Von Miller"],
    correctAnswer: "Malcolm Smith"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "basketball",
    question: "Which team did Dirk Nowitzki play his entire career with?",
    options: ["Mavericks", "Spurs", "Bulls", "Nets"],
    correctAnswer: "Mavericks"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "baseball",
    question: "Which team won the 2016 World Series?",
    options: ["Indians", "Cubs", "Red Sox", "Dodgers"],
    correctAnswer: "Cubs"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "football",
    question: "Which tight end had over 1,000 receiving yards in 2022?",
    options: ["George Kittle", "Mark Andrews", "Travis Kelce", "Darren Waller"],
    correctAnswer: "Travis Kelce"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "basketball",
    question: "Which team drafted Kawhi Leonard?",
    options: ["Spurs", "Pacers", "Raptors", "Clippers"],
    correctAnswer: "Pacers"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level4",
    sport: "baseball",
    question: "Who won AL MVP in 2021?",
    options: ["Aaron Judge", "Shohei Ohtani", "Mike Trout", "Jose Ramirez"],
    correctAnswer: "Shohei Ohtani"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "football",
    question: "What team was Tom Brady originally drafted by?",
    options: ["Buccaneers", "Patriots", "Jets", "49ers"],
    correctAnswer: "Patriots"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "basketball",
    question: "Who holds the NBA record for most assists in a single game?",
    options: ["Magic Johnson", "Rajon Rondo", "John Stockton", "Scott Skiles"],
    correctAnswer: "Scott Skiles"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "baseball",
    question: "Who hit a walk-off homer to win the 1993 World Series?",
    options: ["Barry Bonds", "Joe Carter", "Derek Jeter", "David Ortiz"],
    correctAnswer: "Joe Carter"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "football",
    question: "Which player has the most career sacks in NFL history?",
    options: ["Michael Strahan", "Bruce Smith", "Reggie White", "J.J. Watt"],
    correctAnswer: "Bruce Smith"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "basketball",
    question: "Which player had a 100-point game?",
    options: ["Kobe Bryant", "Wilt Chamberlain", "Jordan", "Shaq"],
    correctAnswer: "Wilt Chamberlain"
  },
  {
    category: "ball_knowledge_test",
    difficulty: "level5",
    sport: "baseball",
    question: "Which player holds the record for most stolen bases in a career?",
    options: ["Lou Brock", "Rickey Henderson", "Ty Cobb", "Ichiro"],
    correctAnswer: "Rickey Henderson"
  }
];

const addBallKnowledgeQuestions = async () => {
  for (const question of questions) {
    try {
      await addDoc(collection(db, "questions"), question);
      console.log(`✅ Added: ${question.question}`);
      await new Promise((resolve) => setTimeout(resolve, 400));
    } catch (err) {
      console.error("❌ Failed to add:", err.message);
    }
  }
};

addBallKnowledgeQuestions();
