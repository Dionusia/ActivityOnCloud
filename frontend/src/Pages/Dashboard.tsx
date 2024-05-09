import React, { useEffect, useState } from 'react';
import BookingsTable from '../Components/BookingsTable';
import { Booking } from '../InterfacesAndTypes/Types';
import instance from '../AxiosConfig';
import SearchByName from '../Components/SearchByName';


const Dashboard: React.FC = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);

  useEffect(() => {
    instance
      .get("/booking")
      .then((response) => {
        const formattedBookings: Booking[] = response.data.map(
          (bookingData: any) => ({
            id: bookingData.uuid,
            customerName: bookingData.name +" "+ bookingData.surname,
            contact: bookingData.email+" | "+bookingData.phone,
            activityName: bookingData.activityOption.name,
            participantsNum: bookingData.persons,
            timeframe: bookingData.startTime,
            pricePayed: bookingData.totalPrice,
          })
        );
        setBookingsList(formattedBookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  // Function to format date and time
  const formatDateTime = (dateTimeString: string): string => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString("en-GB");
    const formattedTime = dateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Date: ${formattedDate} Time: ${formattedTime}`;
  };

  return (
    <div className='flex-col '>
      <h1 className='flex-grow text-center my-6 py-2 px-4 shadow-md rounded'>Dashboard</h1>
      <div className='text-center mb-4'> Bookings
        <SearchByName booking={bookingsList} />
      </div>
    </div>
  );
};

export default Dashboard;
