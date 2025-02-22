import React, { useState } from "react";
import Papa from "papaparse";

type NumberLocation = {
  number: number;
  location: string;
};

type UploaderProps = {
  onUpload: (numbers: NumberLocation[]) => void;
};

const Uploader: React.FC<UploaderProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        const rawData = result.data as string[][];
        const numbers: NumberLocation[] = rawData
          .map((item) => ({
            number: parseInt(item[0], 10),
            location: item[1] || "Desconocido",
          }))
          .filter((item) => !isNaN(item.number));

        onUpload(numbers);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-300">
      <label
        htmlFor="file-upload"
        className="text-lg font-semibold text-gray-700"
      ></label>

      <div className="relative w-full flex flex-col items-center p-4 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition">
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
