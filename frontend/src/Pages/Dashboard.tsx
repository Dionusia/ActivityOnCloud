import React, { useEffect, useState } from "react";
import BookingsTable from "../Components/BookingsTable";
import { Booking } from "../InterfacesAndTypes/Types";
import { ActivityOption } from "../InterfacesAndTypes/Types";
import instance from "../AxiosConfig";
import ActivityOptionTable from "../Components/ActivityOptionTable";
import SearchByName from "../Components/SearchByName";

const adminId = 1;

const Dashboard: React.FC = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [activityOpts, setActivityOptions] = useState<ActivityOption[]>([]);

  useEffect(() => {
    instance
      .get("/booking/of-admin?adminId="+adminId)
      .then((response) => {
        const formattedBookings: Booking[] = response.data.map(
          (bookingData: any) => ({
            id: bookingData.uuid,
            customerName: bookingData.name + " " + bookingData.surname,
            contact: bookingData.email + " | " + bookingData.phone,
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

  useEffect(() => {
    instance
      .get("/activity-option/of-admin?adminId="+adminId)
      .then((response) => {
        const activityOptions: ActivityOption[] = response.data.map(
          (activityData: any) => ({
            activityName: activityData.name,
            activityDescription: activityData.description,
            activityDuration: activityData.duration,
            activityCapacity: activityData.capacity,
            activityImageUrl: activityData.imageUrl,
          })
        );
        setActivityOptions(activityOptions);
      })
      .catch((error) => {
        console.error("Error fetching activity options:", error);
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
    <div className="flex flex-col ">
      <h1 className="flex-grow text-center my-6 py-2 px-4 shadow-md rounded">
        Dashboard
      </h1>
      <div className="flex flex-col justify-center text-center ">
        Bookings
        <SearchByName booking={bookingsList} />
        <br />
        Activities
        <div className="mt-4">
          <ActivityOptionTable activityOption={activityOpts} />
        </div>
          
  
        
      </div>
    </div>
  );
};

export default Dashboard;
