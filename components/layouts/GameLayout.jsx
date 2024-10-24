"use client";
import { useEffect } from "react";
import { Clock, Target, CheckCircle2, XCircle } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

export default function GameLayout({ children }) {
  const {
    timeElapsed,
    isGameStarted,
    isGameEnded,
    correctAnswers,
    wrongAnswers,
    challengesCompleted,
    totalChallenges,
    startGame,
    toast,
    setToast,
  } = useGame();

  useEffect(() => {
    if (isGameEnded && toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [isGameEnded, toast, setToast]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const EndGameScreen = () => (
    <div className="flex h-full flex-col items-center justify-center space-y-8">
      <h2 className="text-3xl font-bold text-primary">Game Over!</h2>
      <div className="text-center">
        <p className="text-xl">Total Time: {formatTime(timeElapsed)}</p>
        <p className="text-xl">Correct Answers: {correctAnswers}</p>
        <p className="text-xl">Wrong Answers: {wrongAnswers}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
        Play Again
      </button>
    </div>
  );

  return (
    <>
      <div className="w-full bg-white p-4 relative rounded-lg shadow-md" style={{ aspectRatio: "1 / 1" }}>
        <div className="h-full flex flex-col">
          {!isGameStarted ? (
            <div className="flex-grow flex flex-col items-center justify-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-700">Ready to Play?</h2>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                Start Game
              </button>
            </div>
          ) : isGameEnded ? (
            <EndGameScreen />
          ) : (
            <div className="flex-grow overflow-auto">{children}</div>
          )}
        </div>

        {toast && (
          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}>
            {toast.message}
          </div>
        )}
      </div>
      {/* Game Stats Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-md">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">{formatTime(timeElapsed)}</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span className="text-lg font-semibold">Correct: {correctAnswers}</span>
        </div>

        <div className="flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-500" />
          <span className="text-lg font-semibold">Wrong: {wrongAnswers}</span>
        </div>

        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">
            Challenges: {challengesCompleted}/{totalChallenges}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${(challengesCompleted / totalChallenges) * 100}%` }}></div>
        </div>
      </div>
    </>
  );
}
