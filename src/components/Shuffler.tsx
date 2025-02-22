import React, { useEffect } from "react";
import { motion } from "framer-motion";

type NumberLocation = {
  number: number;
  location: string;
};

type ShufflerProps = {
  numbers: NumberLocation[];
  isShuffling: boolean;
  winner: NumberLocation | null;
  displayNumber: number;
  setDisplayNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Shuffler: React.FC<ShufflerProps> = ({
  numbers,
  isShuffling,
  winner,
  displayNumber,
  setDisplayNumber,
}) => {
  useEffect(() => {
    if (!isShuffling) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      setDisplayNumber(numbers[randomIndex].number);
    }, 100);

    return () => clearInterval(interval);
  }, [numbers, isShuffling, setDisplayNumber]);

  return (
    <motion.div
      className="text-7xl font-bold text-blue-500 my-8"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      {winner ? winner.number : displayNumber}
    </motion.div>
  );
};

export default Shuffler;
