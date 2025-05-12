// Uploader.tsx
import React, { useState } from "react";
import Papa from "papaparse";

type Participante = {
  numero: string;
  cedula: string;
  nombre: string;
  celular: string;
  ubicacion: string;
};

type UploaderProps = {
  onUpload: (data: Participante[]) => void;
};

const Uploader: React.FC<UploaderProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true, // <- Leemos encabezados
      skipEmptyLines: true,
      complete: (result) => {
        const rawData = result.data as Papa.ParseResult<Participante>["data"];

        const cleaned = rawData.filter(
          (item) =>
            item.numero && !isNaN(parseInt(item.numero)) && item.ubicacion
        );

        onUpload(cleaned);
      },
    });
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-300">
      <div className="relative w-full flex flex-col items-center p-4 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition mt-2">
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <p className="text-gray-500">
          {fileName || "Arrastra y suelta tu archivo aquí"}
        </p>
      </div>

      {fileName && (
        <p className="mt-3 text-sm text-green-600 font-semibold">
          ✅ Archivo seleccionado: {fileName}
        </p>
      )}
    </div>
  );
};

export default Uploader;
