import React, { useState } from "react";
import DatePicker from "./DatePickers";
import PersonPicker from "./PersonPicker";
import SearchButton from "./SearchButton";

const FilterComponents: React.FC = () => {
  return (
    <form className="flex flex-col items-center justify-center mt-8">
      <div className="flex space-x-4">
        <DatePicker />
        <PersonPicker />
      </div>
      <div className="flex justify-end mt-4">
        <SearchButton />
      </div>
    </form>
  );
};
export default FilterComponents;
