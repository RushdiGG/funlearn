"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { useSound } from "@/contexts/SoundContext";

export default function DummyGame() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const {
    incrementCorrectAnswers,
    incrementWrongAnswers,
    incrementChallengesCompleted,
    endGame,
    setTotalChallenges,
    showToast,
    totalChallenges,
    challengesCompleted,
    isGameStarted,
  } = useGame();

  const { playButtonClick, playCorrectAnswer, playWrongAnswer } = useSound();

  useEffect(() => {
    setTotalChallenges(3); // You can change this number to set a different number of total challenges
  }, [setTotalChallenges]);

  useEffect(() => {
    if (!isGameStarted) {
      setCurrentScreen(0);
    }
  }, [isGameStarted]);

  const handleCompleteChallenge = () => {
    playCorrectAnswer();
    incrementCorrectAnswers();
    incrementChallengesCompleted();
    showToast("Correct answer!", "success");

    if (challengesCompleted + 1 < totalChallenges) {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % totalChallenges);
    } else {
      // Game completed
      endGame();
      showToast("Congratulations! You've completed all challenges!", "success");
    }
  };

  const handleWrongAnswer = () => {
    playWrongAnswer();
    incrementWrongAnswers();
    showToast("Oops! That's not correct. Try again!", "error");
  };

  const screens = [
    { id: 0, title: "Challenge 1" },
    { id: 1, title: "Challenge 2" },
    { id: 2, title: "Challenge 3" },
    // Add more challenges here if needed
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl font-bold">{screens[currentScreen % screens.length].title}</h2>
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
