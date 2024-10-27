"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGame } from "@/contexts/GameContext";
import { useSound } from "@/contexts/SoundContext";

export default function ClockLearningGame() {
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [userInput, setUserInput] = useState(["00", "00"]);
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState({ hours: 0, minutes: 0 });

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
    setTotalChallenges(9); // 3 levels with 3 challenges each
  }, [setTotalChallenges]);

  useEffect(() => {
    if (!isGameStarted) {
      resetGame();
    }
  }, [isGameStarted]);

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    startNewRound();
  };

  // Format number to always show two digits
  const formatNumber = (num, isHours = false) => {
    const parsedNum = parseInt(num) || 0;
    // For hours, convert 0 to 12 and ensure range 1-12
    const adjustedNum = isHours
      ? parsedNum === 0
        ? 12
        : parsedNum > 12
        ? parsedNum % 12 || 12
        : parsedNum
      : parsedNum;
    return adjustedNum.toString().padStart(2, "0");
  };

  const generateTimeProblem = () => {
    let hours = Math.floor(Math.random() * 11) + 1;
    let minutes = 0;
    let questionText = "";
    let nextHours = 0;
    let nextMinutes = 0;

    switch (level) {
      case 1:
        minutes = 0;
        nextHours = (hours % 12) + 1;
        nextMinutes = 0;
        questionText = "If we add 1 hour to the time above, what time will it be?";
        break;
      case 2:
        const minutesToAdd = [15, 30, 45][Math.floor(Math.random() * 3)];
        nextMinutes = minutesToAdd;
        nextHours = minutes + minutesToAdd >= 60 ? (hours % 12) + 1 : hours;
        if (nextMinutes >= 60) nextMinutes -= 60;
        questionText = `If we add ${minutesToAdd} minutes to the time above, what time will it be?`;
        break;
      case 3:
        const hoursToAdd = Math.floor(Math.random() * 3) + 1;
        const minsToAdd = [15, 30, 45][Math.floor(Math.random() * 3)];
        nextMinutes = minutes + minsToAdd;
        nextHours = ((hours + hoursToAdd - 1) % 12) + 1;
        if (nextMinutes >= 60) {
          nextHours = (nextHours % 12) + 1;
          nextMinutes -= 60;
        }
        questionText = `If we add ${hoursToAdd} hour${
          hoursToAdd > 1 ? "s" : ""
        } and ${minsToAdd} minutes to the time above, what time will it be?`;
        break;
    }

    return {
      currentTime: `${formatNumber(hours, true)}:${formatNumber(minutes)}`,
      expectedAnswer: { hours: nextHours, minutes: nextMinutes },
      question: questionText,
    };
  };

  const startNewRound = () => {
    const problem = generateTimeProblem();
    setCurrentTime(problem.currentTime);
    setExpectedAnswer(problem.expectedAnswer);
    setQuestion(problem.question);
    setUserInput(["00", "00"]);
    setFeedback("");
    setShowSuccess(false);
  };

  useEffect(() => {
    startNewRound();
  }, [level]);

  const handleInput = (value, index, isHours = false) => {
    playButtonClick();
    const newInput = [...userInput];
    newInput[index] = formatNumber(value, isHours);
    setUserInput(newInput);
  };

  const checkAnswer = () => {
    const userHours = parseInt(userInput[0]) || 0;
    const userMinutes = parseInt(userInput[1]) || 0;

    if (userHours === expectedAnswer.hours && userMinutes === expectedAnswer.minutes) {
      playCorrectAnswer();
      setShowSuccess(true);
      setFeedback("Excellent! You calculated the time correctly! 🌟");
      setScore(score + 1);
      incrementCorrectAnswers();
      incrementChallengesCompleted();
      showToast("Correct answer!", "success");

      if (score + 1 >= 3 && level < 3) {
        setLevel((prev) => prev + 1);
        setScore(0);
        setFeedback("Congratulations! You've mastered this level! 🎉");
      } else if (level === 3 && score + 1 >= 3) {
        endGame();
        showToast("Congratulations! You've completed all challenges!", "success");
      }

      setTimeout(startNewRound, 2000);
    } else {
      playWrongAnswer();
      setFeedback("Not quite right. Try calculating again! 💪");
      incrementWrongAnswers();
      showToast("Oops! That's not correct. Try again!", "error");
    }
  };

  const getLevelDescription = () => {
    switch (level) {
      case 1:
        return "Level 1: Adding hours";
      case 2:
        return "Level 2: Adding minutes (15, 30, or 45)";
      case 3:
        return "Level 3: Adding hours and minutes";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Time Calculator Game
          </span>
          <span className="text-sm">Score: {score}/3</span>
        </CardTitle>
        <div className="text-sm text-gray-600">{getLevelDescription()}</div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{currentTime}</div>
          <p className="text-lg mb-4">{question}</p>

          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="relative">
              <input
                type="text"
                className="w-20 h-16 text-center text-xl border rounded appearance-none"
                value={userInput[0]}
                onChange={(e) => handleInput(e.target.value, 0, true)}
                placeholder="HH"
                style={{
                  paddingRight: "1.5rem",
                }}
              />
              <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col border-l">
                <button
                  className="flex-1 hover:bg-gray-100 text-gray-600 focus:outline-none"
                  onClick={() => {
                    const current = parseInt(userInput[0]) || 0;
                    handleInput((current % 12) + 1, 0, true);
                  }}>
                  ▲
                </button>
                <button
                  className="flex-1 hover:bg-gray-100 text-gray-600 border-t focus:outline-none"
                  onClick={() => {
                    const current = parseInt(userInput[0]) || 0;
                    handleInput(((current - 2 + 12) % 12) + 1, 0, true);
                  }}>
                  ▼
                </button>
              </div>
            </div>
            <span className="text-2xl">:</span>
            <div className="relative">
              <input
                type="text"
                className="w-20 h-16 text-center text-xl border rounded appearance-none"
                value={userInput[1]}
                onChange={(e) => handleInput(e.target.value, 1)}
                placeholder="MM"
                style={{
                  paddingRight: "1.5rem",
                }}
              />
              <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col border-l">
                <button
                  className="flex-1 hover:bg-gray-100 text-gray-600 focus:outline-none"
                  onClick={() => {
                    const current = parseInt(userInput[1]) || 0;
                    handleInput((current + 1) % 60, 1);
                  }}>
                  ▲
                </button>
                <button
                  className="flex-1 hover:bg-gray-100 text-gray-600 border-t focus:outline-none"
                  onClick={() => {
                    const current = parseInt(userInput[1]) || 0;
                    handleInput((current - 1 + 60) % 60, 1);
                  }}>
                  ▼
                </button>
              </div>
            </div>
          </div>

          <Button onClick={checkAnswer} className="w-32">
            Check
          </Button>

          {feedback && (
            <Alert className={`mt-4 ${showSuccess ? "bg-green-50" : "bg-blue-50"}`}>
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
