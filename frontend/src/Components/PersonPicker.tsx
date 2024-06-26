import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { PersonPickerProps } from "../InterfacesAndTypes/Interfaces";

const PersonPicker: React.FC<PersonPickerProps> = ({ onPersonChange,selectedPerson, setSelectedPerson}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);
    onPersonChange(isNaN(num) ? null : num);
  };

  useEffect(() => {
    setSelectedPerson(2);
  }, []);

  return (
    <div id="container" className="relative flex w-24">
      <input
        type="number"
        id="number-input"
        min="0"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-customGreen focus:border-customGreen block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        value={selectedPerson || ""}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 ">
        <FaUser color="#049bb1" />
      </div>
    </div>
  );
};

export default PersonPicker;
