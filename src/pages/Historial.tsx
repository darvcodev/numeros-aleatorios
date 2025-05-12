// Historial.tsx
import React, { useEffect, useState } from "react";

type Ganador = {
  number: number;
  location: string;
  prize: string;
  date: string;
};

const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<Ganador[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("historialGanadores");
    if (data) {
      setHistorial(JSON.parse(data));
    }
  }, []);

  const downloadHistory = () => {
    const historyData = localStorage.getItem("historialGanadores");
    if (!historyData) return;

    const historial = JSON.parse(historyData);

    const header = ["#", "Ubicación", "Premio", "Fecha"];
    const rows = historial.map((g: Ganador) => [
      g.number,
      g.location,
      g.prize,
      g.date,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row: (string | number)[]) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          🏆 Historial de Ganadores
        </h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Ubicación</th>
              <th className="p-2 border">Premio</th>
              <th className="p-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Aún no hay ganadores registrados.
                </td>
              </tr>
            ) : (
              historial.map((g, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{g.number}</td>
                  <td className="border p-2">{g.location}</td>
                  <td className="border p-2">{g.prize}</td>
                  <td className="border p-2">{g.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          onClick={downloadHistory}
          className="w-full py-3 px-6 rounded-lg font-semibold cursor-pointer text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 mt-4"
        >
          📥 Descargar historial (.csv)
        </button>
      </div>
    </div>
  );
};

export default Historial;
