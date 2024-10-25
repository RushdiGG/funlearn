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

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("gameState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setTimeElapsed(parsedState.timeElapsed || 0);
        setIsGameStarted(parsedState.isGameStarted || false);
        setIsGameEnded(parsedState.isGameEnded || false);
        setCorrectAnswers(parsedState.correctAnswers || 0);
        setWrongAnswers(parsedState.wrongAnswers || 0);
        setChallengesCompleted(parsedState.challengesCompleted || 0);
        setTotalChallenges(parsedState.totalChallenges || 0);
        setGameName(parsedState.gameName || "");
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stateToSave = {
        timeElapsed,
        isGameStarted,
        isGameEnded,
        correctAnswers,
        wrongAnswers,
        challengesCompleted,
        totalChallenges,
        gameName,
      };
      localStorage.setItem("gameState", JSON.stringify(stateToSave));
    }
  }, [
    timeElapsed,
    isGameStarted,
    isGameEnded,
    correctAnswers,
    wrongAnswers,
    challengesCompleted,
    totalChallenges,
    gameName,
  ]);

  useEffect(() => {
    let timer;
    if (isGameStarted && !isGameEnded) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, isGameEnded]);

  const startGame = useCallback(() => setIsGameStarted(true), []);
  const endGame = useCallback(() => setIsGameEnded(true), []);
  const incrementCorrectAnswers = useCallback(() => setCorrectAnswers((prev) => prev + 1), []);
  const incrementWrongAnswers = useCallback(() => setWrongAnswers((prev) => prev + 1), []);
  const incrementChallengesCompleted = useCallback(() => setChallengesCompleted((prev) => prev + 1), []);

  const resetGame = useCallback(() => {
    setTimeElapsed(0);
    setIsGameStarted(false);
    setIsGameEnded(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setChallengesCompleted(0);
    // Clear localStorage when resetting the game
    if (typeof window !== "undefined") {
      localStorage.removeItem("gameState");
    }
  }, []);

  const showToast = useCallback(
    (message, type = "info") => {
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
      setToast({ message, type });
      const newTimer = setTimeout(() => {
        setToast(null);
      }, 3000);
      setToastTimer(newTimer);
    },
    [toastTimer]
  );

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
        resetGame,
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
