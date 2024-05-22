import React from "react";
import { SearchButtonProps } from "../InterfacesAndTypes/Interfaces";

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  const handleClick = () => {
    onSearch();
  };
  return (
    <button
      type="button" // Change type to "button" to prevent form submission
      onClick={handleClick}
      className="flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-customGreen rounded-lg border border-blue-700 hover:bg-customHoverGreen focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-customGreen dark:focus:ring-blue-800"
    >
      <svg
        className="w-4 h-4 me-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      Search
    </button>
  );
};

export default SearchButton;
