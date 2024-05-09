import React, { useEffect, useState } from 'react';
import BookingsTable from '../Components/BookingsTable';
import { Booking } from '../InterfacesAndTypes/Types';
import instance from '../AxiosConfig';


const Dashboard: React.FC = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);

  useEffect(() => {
    instance
      .get("/booking")
      .then((response) => {
        const formattedBookings: Booking[] = response.data.map(
          (bookingData: any) => ({
            customerName: bookingData.customerName,
            activityName: bookingData.activity.name,
            participantsNum: bookingData.persons,
            timeframe: formatDateTime(bookingData.startTime),
            pricePayed: bookingData.priceTotal,
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
    <div className='flex flex-col '>
      <h1 className='flex-grow text-center my-6 py-2 px-4 shadow-md rounded'>Dashboard</h1>
      <div className='text-center'> Bookings
        <BookingsTable booking={bookingsList} />
      </div>
    </div>
  );
};

export default Dashboard;
