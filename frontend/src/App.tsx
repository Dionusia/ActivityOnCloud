import React from "react"; 
import { useState } from "react";
import FilterComponents from "./Components/FilterCriteria";
import BookingEngine from "./Pages/BookingEngine";
import Dashboard from "./Pages/Dashboard";
const App: React.FC = () => {
  return (
    <div>
      <Dashboard />
      {/*<BookingEngine />*/}
    </div>
  );
};

export default App;
