import React, { useState } from "react";

const triviaQuestions = [
  {
    question: "Which team won the NBA Championship in 2023?",
    options: ["Boston Celtics", "Denver Nuggets", "Golden State Warriors", "Miami Heat"],
    answer: "Denver Nuggets",
  },
  {
    question: "Who has won the most Super Bowls?",
    options: ["New England Patriots", "Pittsburgh Steelers", "Dallas Cowboys", "San Francisco 49ers"],
    answer: "New England Patriots",
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Brazil", "Germany", "Argentina", "Italy"],
    answer: "Brazil",
  },
];

const Trivia = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    if (option === triviaQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < triviaQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        alert(`Game Over! Your score: ${score + (option === triviaQuestions[currentQuestionIndex].answer ? 1 : 0)}/${triviaQuestions.length}`);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowAnswer(false);
      }
    }, 1500);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🏆 Sports Trivia 🏆</h2>
      <h3>{triviaQuestions[currentQuestionIndex].question}</h3>
      <div>
        {triviaQuestions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              backgroundColor: showAnswer
                ? option === triviaQuestions[currentQuestionIndex].answer
                  ? "green"
                  : option === selectedOption
                  ? "red"
                  : "gray"
                : "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <h4>Score: {score}</h4>
    </div>
  );
};

export default Trivia;
