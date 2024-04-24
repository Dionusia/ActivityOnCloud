import React, { useEffect, useState } from 'react';
import BookingsTable from './BookingsTable';
import instance from '../axioConfig';

const Dashboard: React.FC = () => {
  const bookingsListDummy = [
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

  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    instance.get('/bookings').then((response) => {
      console.log(response.data);
      setBookingsList(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className='text-center my-6 py-2 px-4 shadow-md rounded'>Dashboard</h1>
      <div className='text-center'> Bookings
        <BookingsTable booking={bookingsList} />
      </div>
    </div> 
  );
}

export default Dashboard;