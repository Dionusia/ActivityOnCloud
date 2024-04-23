import React from 'react';
import Dashboard from './Components/Dashboard';

const App: React.FC = () => {

  const dummyBooking = [
    {
    customerName: 'John Doe',
    activityName: 'Hiking',
    participantsNum: '2',
    timeframe: '2022-01-01 10:00',
    pricePayed: '$100'
    },
    {
      customerName: 'Jane Doe',
    activityName: 'Camping',
    participantsNum: '4',
    timeframe: '2022-01-02 12:00',
    pricePayed: '$200'
    },
  ];

  return (
    <div>
      <Dashboard /> //Ειναι το page του dashboard και εχει μεσα τον πινακα που θελουμε (λογικα το θελουμε στο routing και οχι κατευθειαν στο App)
    </div> 
  );
}

export default App;