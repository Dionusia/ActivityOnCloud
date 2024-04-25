import React, { useEffect, useState } from 'react';
import BookingsTable  from './BookingsTable';
import instance from '../AxiosConfig';

type Booking = {
  customerName: string;
  activityName: string;
  participantsNum: string;
  timeframe: string;
  pricePayed: string;
};

const Dashboard: React.FC = () => {


  const [bookingsList, setBookingsList] = useState<Booking[]>([]);

  useEffect(() => {
    instance.get('/booking').then((response) => {

      const responseList: Booking[] = []; 

      //μπορει να υπαρχει πιο αποδοτικος τροπος για να γινει αυτο
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        let booking = {
          customerName: response.data[i].customerName,
          activityName: response.data[i].activity.name,
          participantsNum: response.data[i].persons,
          timeframe: response.data[i].startTime,
          pricePayed: response.data[i].priceTotal
        };
        responseList.push(booking);
      } 
      setBookingsList(responseList); 
      
    }).catch((error) => {
      console.log(error + ': Get bookings error');
    })
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