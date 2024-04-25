import React, { useState } from "react";
import Dashboard from "./Components/Dashboard";
import FilterComponents from "./Components/FilterCriteria";
import BookingEngine from "./Pages/BookingEngine";
const App: React.FC = () => {
  return (
    <div>
      <BookingEngine />
    </div>
  );
};

export default App;
