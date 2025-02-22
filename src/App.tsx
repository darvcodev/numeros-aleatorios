import React, { useState } from "react";
import Uploader from "./components/Uploader";
import Shuffler from "./components/Shuffler";
import WinnerDisplay from "./components/WinnerDisplay";
import "./index.css";

type NumberLocation = {
  number: number;
  location: string;
};

const App: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberLocation[]>([]);
  const [winner, setWinner] = useState<NumberLocation | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const handleNumbers = (uploadedNumbers: NumberLocation[]) => {
    setNumbers(uploadedNumbers);
    setWinner(null);
  };

  const pickWinner = () => {
    setIsShuffling(true);
    setWinner(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      setWinner(numbers[randomIndex]);
      setIsShuffling(false);
    }, 3000);
  };

  const resetRaffle = () => {
    setWinner(null);
    setDisplayNumber(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        {step === 1 ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              📄 Cargar Archivo
            </h1>
            <Uploader onUpload={handleNumbers} />
            <button
              onClick={() => setStep(2)}
              disabled={numbers.length === 0}
              className={`w-full mt-4 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                numbers.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              🚀 Jugar
            </button>
          </>
        ) : (
          <>
            {winner ? (
              <WinnerDisplay
                winner={winner.number}
                location={winner.location}
              />
            ) : (
              <>
                <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
                  Números Aleatorios
                </h1>
                <Shuffler
                  numbers={numbers}
                  isShuffling={isShuffling}
                  winner={winner}
                  displayNumber={displayNumber}
                  setDisplayNumber={setDisplayNumber}
                />
                <button
                  onClick={pickWinner}
                  disabled={numbers.length === 0 || isShuffling}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 mt-4 ${
                    numbers.length === 0 || isShuffling
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isShuffling ? "🎰 Girando..." : "🎯 Elegir Ganador"}
                </button>
              </>
            )}

            {winner && (
              <button
                onClick={resetRaffle}
                className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 mt-4"
              >
                🔄 Nuevo Intento
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
