import React, { useEffect, useState } from "react";
import BookingsTable from "../Components/BookingsTable";
import { Booking } from "../InterfacesAndTypes/Types";
import { Option } from "../InterfacesAndTypes/Types";
import instance from "../AxiosConfig";
import ActivityOptionTable from "../Components/ActivityOptionTable";
import SearchByName from "../Components/SearchByName";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const adminId = 1;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [activityOptions, setActivityOptions] = useState<Option[]>([]);

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
        const activityOptions: Option[] = response.data.map(
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
      <div className="fixed w-screen flex justify-between items-cente z-10 mb-6 py-4 px-2 shadow-md bg-white">
        <h1 className="mt-6">Dashboard</h1>
        <Button 
          className="bg-customGreen text-white rounded-full mt-6 mr-4"
          onClick={() => navigate('/activity-creation')}>
          Import new Activity
        </Button>
      </div>
      <div className="z-0 mt-24 flex flex-col justify-center text-center overflow-y-auto">
        Bookings
        <SearchByName booking={bookingsList} />
        <br />
        Activities
        <div className="mt-4">
          <ActivityOptionTable activityOption={activityOptions} />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
