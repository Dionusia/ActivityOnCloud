import React from 'react';
import BookingsTable from './BookingsTable';

const Dashboard: React.FC = () => {
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
      <h1 className='text-center my-6 py-2 px-4 shadow-md rounded'>Dashboard</h1>
      <div className='text-center'> Bookings
        <BookingsTable booking={dummyBooking} />
      </div>
    </div> 
  );
}

export default Dashboard;