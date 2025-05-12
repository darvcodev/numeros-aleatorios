import React, { useEffect, useState } from "react";

type Ganador = {
  numero: string;
  cedula: string;
  nombre: string;
  celular: string;
  ubicacion: string;
  premio: string;
  fecha: string;
  hora: string;
};

const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<Ganador[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("historialGanadores");
    if (data) {
      setHistorial(JSON.parse(data));
    }
  }, []);

  const downloadHistoryAsCSV = () => {
    const header = [
      "Número",
      "Nombre",
      "Cédula",
      "Celular",
      "Ubicación",
      "Premio",
      "Fecha",
      "Hora",
    ];

    const rows = historial.map((g) => [
      g.numero,
      g.nombre,
      g.cedula,
      g.celular,
      g.ubicacion,
      g.premio,
      g.fecha,
      g.hora,
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

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
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          🏆 Historial de Ganadores
        </h1>

        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Número</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Cédula</th>
              <th className="p-2 border">Celular</th>
              <th className="p-2 border">Ubicación</th>
              <th className="p-2 border">Premio</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Hora</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Aún no hay ganadores registrados.
                </td>
              </tr>
            ) : (
              historial.map((g, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{g.numero}</td>
                  <td className="border p-2">{g.nombre}</td>
                  <td className="border p-2">{g.cedula}</td>
                  <td className="border p-2">{g.celular}</td>
                  <td className="border p-2">{g.ubicacion}</td>
                  <td className="border p-2">{g.premio}</td>
                  <td className="border p-2">{g.fecha}</td>
                  <td className="border p-2">{g.hora}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {historial.length > 0 && (
          <button
            onClick={downloadHistoryAsCSV}
            className="w-full md:w-auto mt-4 py-3 px-6 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          >
            📥 Descargar historial (.csv)
          </button>
        )}
      </div>
    </div>
  );
};

export default Historial;
