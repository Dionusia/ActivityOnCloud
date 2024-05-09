import React, { useEffect, useState } from "react";
import ActivityInfoParent from "../Components/ActivityInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";
import { Activity, UserInputArgs, TimeSlots} from "../InterfacesAndTypes/Interfaces";

const BookingEngine: React.FC = () => {
    const [activitiesList, setAvailableActivitiesList] = useState<Activity[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlots>({});
    const [renderKey, setRenderKey] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    //let formattedDate = "test";
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

    const createActivityInfoComponent = (activitiesList: Activity[], renderKey: number, selectedPerson: number, formattedDate: string) => {
        return activitiesList.map((activity, index) => {
            const availableActivity = activitiesList.find(a => a.id === parseInt(Object.keys(timeSlots)[index]));
            //console.log(availableActivity);

            const UserInputArgs: UserInputArgs = {
                selectedPerson: selectedPerson,
                selectedDate: formattedDate,
            };
            //console.log("Date in component is: "+formattedDate);
            
            if (!availableActivity) {
                return null;
            }
            return (
                <div key={`${index}-${renderKey}`} className={`w-full ${selectedOption === activity.id ? 'border-2 border-black rounded-lg' : ''} hover:shadow-xl`} onClick={() => setSelectedOption(activity.id)}>
                    {Object.keys(timeSlots).length > 0 &&
                        <ActivityInfoParent
                            activity={availableActivity}
                            timeSlot={timeSlots[Object.keys(timeSlots)[index]]}
                            userInputArgs={UserInputArgs}
                        />
                    }
                    
                </div>
            )
            })
    }

    return (
        <div className=" flex flex-col space-y-4 items-center">
            <FilterComponents setTimeSlots={setTimeSlots} selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} setFormattedDate={setFormattedDate} />
            
            <div className="flex flex-col items-center space-y-6 w-4/5 max-w-96">
                {   
                    createActivityInfoComponent(activitiesList, renderKey, selectedPerson as number, formattedDate)        
                }
            </div>
        </div>
    );
}

export default BookingEngine;