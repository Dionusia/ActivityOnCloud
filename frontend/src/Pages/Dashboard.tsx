import React, { useEffect, useState } from "react";
import { Booking } from "../InterfacesAndTypes/Types";
import { Option } from "../InterfacesAndTypes/Types";
import ActivityOptionTable from "../Components/ActivityOptionTable";
import SearchByName from "../Components/SearchByName";
import ActivityContext from "../ActivityContext";
import Cookies from "js-cookie";


const Dashboard: React.FC = () => {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [activityOptions, setActivityOptions] = useState<Option[]>([]);
  const activityContext = React.useContext(ActivityContext);
  const instance = activityContext.instance;
  const adminId = Cookies.get("adminId");
  console.log('AdminId:', adminId);
  

  useEffect(() => {
    const fetchBookings = async () => {
      if(instance !== null) {
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
        } else {
          console.error('Axios instance is null in Dashboard/bookings.');
        }
      };

      fetchBookings();

      const interval = setInterval(fetchBookings, 10000);
      //clear the interval when the component is unmounted
      return () => clearInterval(interval);
  },[instance]);

    useEffect(() => {
      if(instance !== null){
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
      }
      else {
        console.error('Axios instance is null in Dashboard/activity-option.');
      }
    }, [instance]);

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
          <ActivityOptionTable activityOption={activityOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
