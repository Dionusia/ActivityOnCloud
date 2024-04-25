import React from 'react';
import Dashboard from './Components/Dashboard';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <div>
      {/*
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
            <Dashboard />
          </Route>
          <Route path="/booking-engine" component={BookingEngine} />
            <BookingEngine />
          </Route>
        </Switch>
      </Router>
    */}
      <Dashboard /> {/*Ειναι το page του dashboard και εχει μεσα τον πινακα που θελουμε (λογικα το θελουμε στο routing και οχι κατευθειαν στο App)*/}
    </div> 
  );
};

export default App;
