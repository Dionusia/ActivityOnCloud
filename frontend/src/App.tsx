import React from 'react';
import Dashboard from './Components/Dashboard';
import { Datepicker } from "flowbite-react";

const App: React.FC = () => {


  return (
    <div>
      {/*<Datepicker/>*/}
      <Dashboard /> {/*Ειναι το page του dashboard και εχει μεσα τον πινακα που θελουμε (λογικα το θελουμε στο routing και οχι κατευθειαν στο App)*/}
    </div> 
  );
}

export default App;