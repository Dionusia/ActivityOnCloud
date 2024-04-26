import React from 'react';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingEngine from './Pages/BookingEngine';


const App: React.FC = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/dashboard" element ={<Dashboard />}>
        </Route>
        
        <Route path="/booking-engine" element ={<BookingEngine />}>
        </Route>
      </Routes>
    </Router>

    </div> 
  );
};

export default App;