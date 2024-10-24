"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [gameName, setGameName] = useState("");
  const [toast, setToast] = useState(null);
  const [toastTimer, setToastTimer] = useState(null);

  useEffect(() => {
    let timer;
    if (isGameStarted && !isGameEnded) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, isGameEnded]);

  const startGame = () => setIsGameStarted(true);
  const endGame = () => setIsGameEnded(true);
  const incrementCorrectAnswers = () => setCorrectAnswers((prev) => prev + 1);
  const incrementWrongAnswers = () => setWrongAnswers((prev) => prev + 1);
  const incrementChallengesCompleted = () => setChallengesCompleted((prev) => prev + 1);

  const showToast = useCallback((message, type = "info") => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    setToast({ message, type });
    const newTimer = setTimeout(() => {
      setToast(null);
    }, 3000);
    setToastTimer(newTimer);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  return (
    <GameContext.Provider
      value={{
        timeElapsed,
        isGameStarted,
        isGameEnded,
        correctAnswers,
        wrongAnswers,
        challengesCompleted,
        totalChallenges,
        gameName,
        toast,
        startGame,
        endGame,
        incrementCorrectAnswers,
        incrementWrongAnswers,
        incrementChallengesCompleted,
        setGameName,
        setTotalChallenges,
        showToast,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
