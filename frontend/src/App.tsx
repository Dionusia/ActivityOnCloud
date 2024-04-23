import React, { useState } from "react";
import Dashboard from "./Components/Dashboard";
import { Datepicker } from "flowbite-react";
import DatePick from "./Components/DatePick";
import PersonPicker from "./Components/PersonPicker";
const App: React.FC = () => {
  return (
    <div>
      <DatePick />
      <PersonPicker />
    </div>
  );
};

export default App;
