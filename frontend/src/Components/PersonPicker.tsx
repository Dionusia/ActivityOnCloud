import React, { useState } from "react";

const NumberInputForm: React.FC = () => {
  const [number, setNumber] = useState<number | string>(""); // Using union type to allow number or string

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value); // Update the state with the input value
  };

  return (
    <form className="max-w-sm mx-auto">
      <input
        type="number"
        id="number-input"
        min="0"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Number of people"
        required
        value={number}
        onChange={handleChange}
      />
    </form>
  );
};

export default NumberInputForm;
