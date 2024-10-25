"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { useSound } from "@/contexts/SoundContext";

export default function TenBuddies() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const {
    incrementCorrectAnswers,
    incrementWrongAnswers,
    incrementChallengesCompleted,
    endGame,
    setTotalChallenges,
    totalChallenges,
    showToast,
  } = useGame();

  const { playButtonClick, playCorrectAnswer, playWrongAnswer } = useSound();

  useEffect(() => {
    setTotalChallenges(screens.length);
    generateRandomNumber();
  }, [setTotalChallenges]);

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 9) + 1);
  };

  const handleNumberClick = (number) => {
    if (number + randomNumber === 10) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    playCorrectAnswer();
    incrementCorrectAnswers();
    incrementChallengesCompleted();
    showToast("Correct! That makes 10!", "success");
    if (currentScreen < totalChallenges - 1) {
      setCurrentScreen(currentScreen + 1);
      generateRandomNumber();
    } else {
      // Game completed
      endGame();
      showToast("Congratulations! You've completed all challenges!", "success");
    }
  };

  const handleWrongAnswer = () => {
    playWrongAnswer();
    incrementWrongAnswers();
    showToast("Oops! That doesn't make 10. Try again!", "error");
  };

  const renderNumpad = () => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="w-16 h-16 text-2xl font-bold bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            {number}
          </button>
        ))}
      </div>
    );
  };

  const screens = [
    { id: 0, title: "Find the Ten Buddy - Challenge 1" },
    { id: 1, title: "Find the Ten Buddy - Challenge 2" },
    { id: 2, title: "Find the Ten Buddy - Challenge 3" },
    { id: 3, title: "Find the Ten Buddy - Challenge 4" },
    { id: 4, title: "Find the Ten Buddy - Challenge 5" },
    { id: 5, title: "Find the Ten Buddy - Challenge 6" },
    { id: 6, title: "Find the Ten Buddy - Challenge 7" },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl font-bold">{screens[currentScreen].title}</h2>
      <div className="text-6xl font-bold mb-8">{randomNumber}</div>
      <p className="text-xl mb-4">Click the number that adds up to 10!</p>
      {renderNumpad()}
    </div>
  );
}
