// src/components/WinnerDisplay.tsx
import React from "react";
import Confetti from "react-confetti";

interface WinnerDisplayProps {
  winner: number;
  location: string;
  prize: string;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({
  winner,
  location,
  prize,
}) => {
  return (
    <>
      <Confetti />
      <div className="relative flex flex-col items-center justify-center bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md border-4 border-green-500 text-center mb-8">
        <h2 className="text-4xl font-extrabold text-green-600 mb-2">
          🎉 ¡Ganador! 🎉
        </h2>
        <p className="text-5xl font-bold text-gray-900">#{winner}</p>
        <h3 className="text-xl text-gray-700 mt-2">
          Desde: <span className="font-semibold">{location}</span>
        </h3>
        <h3 className="text-xl text-gray-700">
          Premio: <span className="font-semibold">{prize}</span>
        </h3>
      </div>
    </>
  );
};

export default WinnerDisplay;
