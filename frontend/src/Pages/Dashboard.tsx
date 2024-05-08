import React, { useEffect, useState } from 'react';
import BookingsTable from '../Components/BookingsTable';
import { Booking } from '../InterfacesAndTypes/Types';
import instance from '../AxiosConfig';


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
          timeframe: `Date: ${new Date(response.data[i].startTime).toLocaleDateString('en-GB')} Time: ${new Date(response.data[i].startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
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
