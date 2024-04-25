import React from "react";
import { FaUser } from "react-icons/fa";

interface PersonPickerProps {
  onPersonChange: (num: number | null) => void;
  selectedPerson: number | null;
}

const PersonPicker: React.FC<PersonPickerProps> = ({
  onPersonChange,
  selectedPerson,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);
    onPersonChange(isNaN(num) ? null : num);
  };

  return (
    <div id="container" className="relative flex w-24">
      <input
        type="number"
        id="number-input"
        min="0"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        value={selectedPerson || ""}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 w-6 h-6">
        <FaUser color="blue" />
      </div>
    </div>
  );
};

export default PersonPicker;
