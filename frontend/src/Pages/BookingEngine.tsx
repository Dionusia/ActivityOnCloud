import React, { useEffect, useState } from "react";
import ActivityInfoParent, {type TimeSlot} from "../Components/ActivityInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../../config/AxiosConfig";

const BookingEngine: React.FC = () => {
    // const timeSlots = [
    //     {
    //         "start": "10:00:00",
    //         "end": "12:30:00"
    //     },
    //     {
    //         "start": "12:30:00",
    //         "end": "15:00:00"
    //     },
    //     {
    //         "start": "15:00:00",
    //         "end": "17:30:00"
    //     }
    // ]
    // const activitiesList = [
    //     {
    //         "id": 1,
    //         "activityAdmin": {
    //             "id": 1
    //         },
    //         "name": "Title",
    //         "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
    //         "durationDays": 0,
    //         "durationHours": 2,
    //         "durationMinutes": 30,
    //         "pricePerPerson": 100
    //     },
    //     {
    //         "id": 51,
    //         "activityAdmin": {
    //             "id": 1
    //         },
    //         "name": "Title",
    //         "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
    //         "durationDays": 0,
    //         "durationHours": 3,
    //         "durationMinutes": 0,
    //         "pricePerPerson": 200
    //     },
    //     {
    //         "id": 101,
    //         "activityAdmin": {
    //             "id": 51
    //         },
    //         "name": "Title",
    //         "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
    //         "durationDays": 1,
    //         "durationHours": 0,
    //         "durationMinutes": 0,
    //         "pricePerPerson": 300
    //     }
    // ]
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
                            timeSlot={timeSlots} 
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