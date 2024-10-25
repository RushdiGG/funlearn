"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const buttonClickSound = useRef(null);
  const correctAnswerSound = useRef(null);
  const wrongAnswerSound = useRef(null);

  const playSound = useCallback((sound) => {
    if (sound.current) {
      sound.current.currentTime = 0;
      sound.current.play();
    }
  }, []);

  const playButtonClick = useCallback(() => playSound(buttonClickSound), [playSound]);
  const playCorrectAnswer = useCallback(() => playSound(correctAnswerSound), [playSound]);
  const playWrongAnswer = useCallback(() => playSound(wrongAnswerSound), [playSound]);

  return (
    <SoundContext.Provider value={{ playButtonClick, playCorrectAnswer, playWrongAnswer }}>
      <audio ref={buttonClickSound} src="/sounds/button-click.mp3" />
      <audio ref={correctAnswerSound} src="/sounds/correct-answer.mp3" />
      <audio ref={wrongAnswerSound} src="/sounds/wrong-answer.mp3" />
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
