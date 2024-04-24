import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const NumberInputForm: React.FC = () => {
  const [number, setNumber] = useState<number | string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  return (
    <div className="relative flex">
      <input
        type="number"
        id="number-input"
        min="0"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select people"
        required
        value={number}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 w-4 h-4">
        <FaUser color="blue" />
      </div>
    </div>
  );
};

export default NumberInputForm;
