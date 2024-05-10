import React, { useEffect, useState } from "react";
import ActivityInfoParent from "../Components/ActivityOptionInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";
import { ActivityOption, UserInputArgs, TimeSlots} from "../InterfacesAndTypes/Interfaces";

const BookingEngine: React.FC = () => {
    const [availableOptionsList, setAvailableOptionsList] = useState<ActivityOption[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlots>({});
    const [renderKey, setRenderKey] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [pricePerPerson, setPricePerPerson] = useState<number[]>([]);

    useEffect(() => {
        instance.get('/activity-option')
            .then(response => {
                // console.log(response.data);
                setAvailableOptionsList(response.data);                
            })
            .catch( error => {
                console.error('There was an error retrieving the activities array' + error);
            })
    },[]); 

    useEffect(() => {
        setRenderKey(prevKey => prevKey + 1);
    }, [timeSlots]);

    const createActivityInfoComponent = (availableOptionsList: ActivityOption[], renderKey: number, selectedPerson: number, formattedDate: string, pricePerPerson: number[]) => {
        return availableOptionsList.map((option, index) => {
            
            const availableOption = availableOptionsList.find(a => a.id === parseInt(Object.keys(timeSlots)[index]));

            const UserInputArgs: UserInputArgs = {
                selectedPerson: selectedPerson,
                selectedDate: formattedDate,
            };
            //console.log("Date in component is: "+formattedDate);
            
            if (!availableOption) {
                return null;
            }
            return (
                <div key={`${index}-${renderKey}`} className={`w-full ${selectedOption === option.id ? 'border-2 border-black rounded-lg' : ''}`} onClick={() => setSelectedOption(option.id)}>
                    {Object.keys(timeSlots).length > 0 &&
                        <ActivityInfoParent
                            activity={availableOption}
                            timeSlot={timeSlots[Object.keys(timeSlots)[index]]}
                            userInputArgs={UserInputArgs}
                            pricePerPerson={pricePerPerson[index]}
                        />
                    }
                    
                </div>
            )
            })
    }

    return (
        <div className=" flex flex-col space-y-4 items-center">
            <FilterComponents setTimeSlots={setTimeSlots} selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} setFormattedDate={setFormattedDate} setPricePerPerson={setPricePerPerson}/>
            
            <div className="flex flex-col items-center space-y-6 w-4/5 max-w-96">
                {   
                    createActivityInfoComponent(availableOptionsList, renderKey, selectedPerson as number, formattedDate, pricePerPerson)        
                }
            </div>
        </div>
    );
}

export default BookingEngine;