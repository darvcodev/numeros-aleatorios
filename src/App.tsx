import React, { useEffect, useState } from "react";
import Uploader from "./components/Uploader";
import Shuffler from "./components/Shuffler";
import WinnerDisplay from "./components/WinnerDisplay";
import "./index.css";

type Participante = {
  numero: string;
  cedula: string;
  nombre: string;
  celular: string;
  ubicacion: string;
  premio?: string;
  fecha?: string;
  hora?: string;
};

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participante[]>([]);
  const [winner, setWinner] = useState<Participante | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [prizeInput, setPrizeInput] = useState<string>("");
  const [history, setHistory] = useState<Participante[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("historialGanadores");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleNumbers = (uploaded: Participante[]) => {
    setParticipants(uploaded);
    setWinner(null);
  };

  const handleLocations = (locations: string[]) => {
    setLocations(locations);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setStep(3);
  };

  const pickWinner = () => {
    setIsShuffling(true);
    setWinner(null);

    const filteredParticipants = selectedLocation
      ? participants.filter((p) => p.ubicacion === selectedLocation)
      : participants;

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredParticipants.length);
      const winnerPicked = filteredParticipants[randomIndex];
      setWinner(winnerPicked);
      setIsShuffling(false);

      const now = new Date().toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const ganadorConFecha: Participante = {
        ...winnerPicked,
        premio: prizeInput,
        fecha: now.split(",")[0],
        hora: now.split(",")[1],
      };

      const updatedHistory = [...history, ganadorConFecha];
      setHistory(updatedHistory);
      localStorage.setItem(
        "historialGanadores",
        JSON.stringify(updatedHistory)
      );
    }, 3000);
  };

  const resetRaffle = () => {
    setWinner(null);
    setDisplayNumber(0);
    setStep(2);
  };

  const filteredParticipantsForShuffler = selectedLocation
    ? participants.filter((p) => p.ubicacion === selectedLocation)
    : participants;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        {step === 1 ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              📄 Cargar Archivo
            </h1>
            <Uploader onUpload={handleNumbers} onLocations={handleLocations} />
            <button
              onClick={() => setStep(2)}
              disabled={participants.length === 0}
              className={`w-full mt-4 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                participants.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              ➡️ Continuar
            </button>
          </>
        ) : step === 2 ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              📍 Seleccionar Ubicación
            </h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div
                onClick={() => handleLocationSelect("")}
                className="bg-gray-200 p-4 rounded-lg cursor-pointer hover:bg-gray-300 transition"
              >
                Todas
              </div>
              {locations.map((location) => (
                <div
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200 transition"
                >
                  {location}
                </div>
              ))}
            </div>
          </>
        ) : step === 3 ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              🎁 Ingresar Premio
            </h1>
            <input
              type="text"
              placeholder="Ejemplo: CAMISETA"
              value={prizeInput}
              onChange={(e) => setPrizeInput(e.target.value.toUpperCase())}
              className="w-full p-3 border rounded-lg text-lg mb-4 uppercase"
            />
            <button
              onClick={() => setStep(4)}
              disabled={!prizeInput.trim()}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                !prizeInput.trim()
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
                winner={parseInt(winner.numero)}
                location={winner.ubicacion}
                prize={winner.premio || prizeInput}
                name={winner.nombre}
              />
            ) : (
              <>
                <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{`Premio: ${prizeInput}`}</h1>
                <Shuffler
                  numbers={filteredParticipantsForShuffler.map((p) => ({
                    number: parseInt(p.numero),
                    location: p.ubicacion,
                  }))}
                  isShuffling={isShuffling}
                  winner={
                    winner && "numero" in winner && "ubicacion" in winner
                      ? {
                          number: parseInt((winner as Participante).numero),
                          location: (winner as Participante).ubicacion,
                        }
                      : null
                  }
                  displayNumber={displayNumber}
                  setDisplayNumber={setDisplayNumber}
                />
                <button
                  onClick={pickWinner}
                  disabled={participants.length === 0 || isShuffling}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 mt-4 ${
                    participants.length === 0 || isShuffling
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
