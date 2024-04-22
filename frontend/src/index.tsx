import React from "react";
import BookingsList from "./Components/BookingsList";

const dummyBooking = [{
  activityDescription: "This is a dummy activity",
  activityName: "Dummy Activity",
  imageUrl: "https://example.com/dummy-image.jpg",
  timeframe: "2022-01-01T00:00:00Z",
  payment: "Paid",
  paymentDateTime: "2022-01-01T00:00:00Z",
}];

<div>
  <h1>Bookings</h1>
  <BookingsList booking={dummyBooking} />
</div> 