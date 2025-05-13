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

  const resumenPremios = historial.reduce(
    (acc: Record<string, { count: number; total: number }>, { premio }) => {
      const key = premio || "SIN PREMIO";

      if (!acc[key]) {
        acc[key] = { count: 0, total: 0 };
      }

      acc[key].count += 1;

      const esDinero = key.includes("$");

      if (esDinero) {
        const cleanValue = key.replace(/[^\d]/g, ""); // deja solo números
        const numericValue = parseFloat(cleanValue);
        acc[key].total += isNaN(numericValue) ? 0 : numericValue;
      }

      return acc;
    },
    {}
  );

  const totalGeneral = Object.values(resumenPremios).reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Tabla */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-md p-6 overflow-x-auto">
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
                  <td colSpan={8} className="text-center py-4 text-gray-500">
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
              className="w-full md:w-auto mt-4 py-3 px-6 rounded-lg font-semibold text-white cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            >
              📅 Descargar historial (.csv)
            </button>
          )}
        </div>

        {/* Resumen lateral */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 h-full">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              📊 Resumen
            </h2>

            {Object.keys(resumenPremios).length === 0 ? (
              <p className="text-gray-500 text-center">
                Aún no hay estadísticas disponibles.
              </p>
            ) : (
              <>
                {/* Total General */}
                <div className="bg-yellow-400 text-gray-900 p-4 rounded-lg shadow mt-2">
                  <h3 className="text-base font-bold">💵 Total sorteado</h3>
                  <p className="text-xl font-bold">
                    ${totalGeneral.toLocaleString("es-CO")}
                  </p>
                </div>

                {Object.entries(resumenPremios).map(([premio, data], index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-800 to-indigo-500 text-white p-4 rounded-lg shadow"
                  >
                    <h3 className="text-base font-semibold">
                      🎁 Premio: {premio}
                    </h3>
                    <h3 className="text-base font-semibold">
                      🎯 Cantidad: {data.count}
                    </h3>
                    {data.total > 0 && (
                      <h3 className="text-base font-semibold">
                        💰 Total: ${data.total.toLocaleString("es-CO")}
                      </h3>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;
