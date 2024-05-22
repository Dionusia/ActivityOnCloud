import React, { useState } from 'react';
import Dashboard from './Pages/Dashboard';
import {Route, Routes } from 'react-router-dom';
import BookingEngine from './Pages/BookingEngine';
import PersonalInfoForm from './Pages/PersonalInfoForm';
import Login from './Pages/Login';
import {ActivityOption, ExtendedUserInputArgs} from './InterfacesAndTypes/Interfaces';
import ActivityContext from './ActivityContext';
import SuccessfulBooking from './Components/SuccessfulBooking';
import ActivityCreation from "./Pages/ActivityCreation";
import { createAxiosInstance } from './AxiosConfig';
import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<ActivityOption | null>(
    null
  );
  const [selectedInfoFinal, setSelectedInfoFinal] =
    useState<ExtendedUserInputArgs | null>(null);

  const navigate = useNavigate();
  //use state to create only one axios instance
  const [instance, setInstance] = useState(() => createAxiosInstance());
  return (
    <ActivityContext.Provider value={{selectedOption, setSelectedOption, selectedInfoFinal, setSelectedInfoFinal, instance}}> {/*TODO: Future edit remove Dashboard from Context */}
      {
        <div>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/dashboard" element ={<Dashboard />} />
            <Route path="/booking-engine" element ={<BookingEngine />} />
            <Route path="/personal-info" element ={<PersonalInfoForm />} />
            <Route path='/login' element={<Login />} />
            <Route path="/successful-booking" element={<SuccessfulBooking/>} />
            <Route
                path="/activity-creation"
                element={<ActivityCreation />}
              ></Route>
          </Routes>
        </div> 
      }
    </ActivityContext.Provider>
  );
};

export default App;
