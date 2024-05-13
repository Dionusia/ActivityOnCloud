import React from "react";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingEngine from "./Pages/BookingEngine";
import PersonalInfoForm from "./Pages/PersonalInfoForm";
import ActivityCreation from "./Pages/ActivityCreation";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/booking-engine" element={<BookingEngine />}></Route>

          <Route path="/personal-info" element={<PersonalInfoForm />}></Route>

          <Route
            path="/activity-creation"
            element={<ActivityCreation />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
