import React, {useState} from 'react';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingEngine from './Pages/BookingEngine';
import PersonalInfoForm from './Pages/PersonalInfoForm';
import Login from './Pages/Login';
import {ActivityOption, ExtendedUserInputArgs} from './InterfacesAndTypes/Interfaces';
import ActivityContext from './ActivityContext';


const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<ActivityOption | null>(null);  
  const [selectedInfoFinal, setSelectedInfoFinal] = useState<ExtendedUserInputArgs | null>(null);
  return (
    <ActivityContext.Provider value={{selectedOption, setSelectedOption, selectedInfoFinal, setSelectedInfoFinal}}> {/*TODO: Future edit remove Dashboard from Context */}
      {
        <div>
          <Router>
          <Routes>
            <Route path="/dashboard" element ={<Dashboard />} />
            <Route path="/booking-engine" element ={<BookingEngine />} />
            <Route path="/personal-info" element ={<PersonalInfoForm />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
        </div> 
      }
    </ActivityContext.Provider>
  );
};

export default App;