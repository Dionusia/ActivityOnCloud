import React from "react";
import ActivityInfoParent from "../Components/ActivityInfo";
import FilterComponents from "../Components/FilterCriteria";

const BookingEngine: React.FC = () => {
    const timeSlots = [
        {
            "start": "10:00:00",
            "end": "12:30:00"
        },
        {
            "start": "12:30:00",
            "end": "15:00:00"
        },
        {
            "start": "15:00:00",
            "end": "17:30:00"
        }
    ]
    const activitiesList = [
        {
            "id": 1,
            "activityAdmin": {
                "id": 1
            },
            "name": "Title",
            "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
            "durationDays": 0,
            "durationHours": 2,
            "durationMinutes": 30,
            "pricePerPerson": 100
        },
        {
            "id": 51,
            "activityAdmin": {
                "id": 1
            },
            "name": "Title",
            "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
            "durationDays": 0,
            "durationHours": 3,
            "durationMinutes": 0,
            "pricePerPerson": 200
        },
        {
            "id": 101,
            "activityAdmin": {
                "id": 51
            },
            "name": "Title",
            "description": "Lorem ipsus vwgwrbrwbrebrebrreberb rtbtrbtrbtrbtrbtrbtrb brtbrtbtrbtrbrtb brtbrtb bb rt",
            "durationDays": 1,
            "durationHours": 0,
            "durationMinutes": 0,
            "pricePerPerson": 300
        }
    ]
    return (
        <div className="flex flex-col space-y-4 items-center">
            <FilterComponents />
            <div className="flex flex-col items-center space-y-4">
                {activitiesList.map((activity, index) => (
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
                                }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingEngine;