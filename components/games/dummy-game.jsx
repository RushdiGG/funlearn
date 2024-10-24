"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";

export default function DummyGame() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const {
    incrementCorrectAnswers,
    incrementWrongAnswers,
    incrementChallengesCompleted,
    endGame,
    setTotalChallenges,
    showToast,
  } = useGame();

  useEffect(() => {
    setTotalChallenges(3);
  }, [setTotalChallenges]);

  const handleCompleteChallenge = () => {
    incrementCorrectAnswers();
    incrementChallengesCompleted();
    showToast("Correct answer!", "success");
    if (currentScreen < 2) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Game completed
      endGame();
      showToast("Congratulations! You've completed all challenges!", "success");
    }
  };

  const handleWrongAnswer = () => {
    incrementWrongAnswers();
    showToast("Oops! That's not correct. Try again!", "error");
  };

  const screens = [
    { id: 0, title: "Challenge 1" },
    { id: 1, title: "Challenge 2" },
    { id: 2, title: "Challenge 3" },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl font-bold">{screens[currentScreen].title}</h2>
      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={handleCompleteChallenge}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Complete Challenge
        </button>
        <button
          onClick={handleWrongAnswer}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Wrong Answer
        </button>
      </div>
    </div>
  );
}
