import React, { useEffect, useState } from "react";
import ActivityInfoParent from "../Components/ActivityInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";

const BookingEngine: React.FC = () => {
    interface ActivityAdmin {
        id: number;
    }
      
    interface Activity {
        id: number;
        activityAdmin: ActivityAdmin;
        name: string;
        description: string;
        durationDays: number;
        durationHours: number;
        durationMinutes: number;
        pricePerPerson: number;
    }
    const [availableActivitiesList, setAvailableActivitiesList] = useState<Activity[]>([]);
    useEffect(() => {
        instance.get('/availability/available')
            .then(response => {
                setAvailableActivitiesList(response.data);
            })
            .catch( error => {
                console.error('There was an error retrieving the timeSlots array' + error);
            })
    }); 
    //TODO retrieve time slots for each activity
    return (
        <div className="flex flex-col space-y-4 items-center">
            <FilterComponents />
            <div className="flex flex-col items-center space-y-4">
                {availableActivitiesList.map((activity, index) => (
                    <div key={index} >
                        <ActivityInfoParent 
                            title={activity.name} 
                            description={activity.description} 
                            price={activity.pricePerPerson * 2} //TODO multiply by the number of people from filter component
                            timeSlot= 
                            duration={
                                {
                                    durationDays: activity.durationDays,
                                    durationHours: activity.durationHours,
                                    durationMinutes: activity.durationMinutes
                                }
                            } 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingEngine;