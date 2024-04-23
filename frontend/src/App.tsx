import React from 'react';
import BookingsList from './Components/BookingsList';

const App: React.FC = () => {

  const dummyBooking = [{
    activityDescription: "This is a activity",
    activityName: "Dummy Activity",
    imageUrl: "https://example.com/dummy-image.jpg",
    timeframe: "2022-01-01T00:00:00Z",
    payment: "Paid",
    paymentDateTime: "2022-01-01T00:00:00Z",
  }];

  return (
    <div>
      <h1>Bookings</h1>
      <BookingsList booking={dummyBooking} />
    </div> 
  );
}

export default App;