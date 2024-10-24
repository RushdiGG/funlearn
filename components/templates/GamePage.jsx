"use client";

import { useState } from "react";
import { GameProvider } from "@/contexts/GameContext";
import GameLayout from "@/components/layouts/GameLayout";
import { ChevronDown } from "lucide-react";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-6">
      <button
        className="w-full p-4 text-left font-semibold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}>
        {title}
        <ChevronDown className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
}

export default function PageTemplate({ gameName, gameDescription, learningPoints, children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">{gameName}</h1>

        <GameProvider>
          <GameLayout>{children}</GameLayout>
        </GameProvider>

        <p className="my-6 text-center text-lg text-gray-600">{gameDescription}</p>

        <Accordion title="What you will learn">
          <ul className="list-disc pl-5">
            {learningPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  );
}
