import React, { useEffect, useState } from "react";
import ActivityInfoParent from "../Components/ActivityInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";
//#region interfaces and types
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


type TimeSlot = {
    start: string;
    end: string;
    remainingCapacity: string;
}

interface TimeSlots {
    [key: string]: TimeSlot[];
}
//#endregion 
const BookingEngine: React.FC = () => {
    const [activitiesList, setAvailableActivitiesList] = useState<Activity[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlots>({});
    const [renderKey, setRenderKey] = useState(0);
    useEffect(() => {
        instance.get('/activity')
            .then(response => {
                setAvailableActivitiesList(response.data);                
            })
            .catch( error => {
                console.error('There was an error retrieving the activities array' + error);
            })
    },[]); 

    useEffect(() => {
        setRenderKey(prevKey => prevKey + 1);
    }, [timeSlots]);

    const createActivityInfoComponent = (activitiesList: Activity[], renderKey: number) => {
        return activitiesList.map((activity, index) => {
            const availableActivity = activitiesList.find(a => a.id === parseInt(Object.keys(timeSlots)[index]));
            console.log(availableActivity);
            
            if(!availableActivity) {
                return null;
            }
            return (
                <div key={`${index}-${renderKey}`} >
                    {Object.keys(timeSlots).length > 0 &&
                        <ActivityInfoParent 
                            title={availableActivity.name} 
                            description={availableActivity.description} 
                            price={availableActivity.pricePerPerson * 2} //TODO multiply by the number of people from filter component
                            timeSlot={timeSlots[Object.keys(timeSlots)[index]]}
                            duration={
                                {
                                    durationDays: availableActivity.durationDays,
                                    durationHours: availableActivity.durationHours,
                                    durationMinutes: availableActivity.durationMinutes
                                }
                            } 
                        />
                    }
                </div>)
            })
    }

    return (
        <div className="flex flex-col space-y-4 items-center">
            <FilterComponents setTimeSlots={setTimeSlots}/>
            
            <div className="flex flex-col items-center space-y-4">
                {    
                    createActivityInfoComponent(activitiesList, renderKey)        
                }
            </div>
        </div>
    );
}

export default BookingEngine;
export type {TimeSlot,TimeSlots};