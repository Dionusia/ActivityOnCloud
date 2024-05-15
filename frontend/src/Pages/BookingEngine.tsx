import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityOptionInfo from "../Components/ActivityOptionInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";
import { ActivityOption, OptionToBeRendered, TimeSlotsResponse, UserInputArgs, } from "../InterfacesAndTypes/Interfaces";
import { Button } from "flowbite-react";
import ActivityContext from "../ActivityContext";


//για καποιο λογο καλειτε 2 φορεσ το component
const BookingEngine: React.FC = () => {
    //#region states
    const [availableOptionsList, setAvailableOptionsList] = useState<ActivityOption[]>([]);
    const [timeSlotsResponseList, setTimeSlotsResponseList] = useState<TimeSlotsResponse[]>([]);
    const [renderKey, setRenderKey] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [pricePerPerson, setPricePerPerson] = useState<number[]>([]);
    const [optionsToBeRendered, setOptionsToBeRendered] = useState<OptionToBeRendered[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    //#endregion

    const activityContext = useContext(ActivityContext);
    const navigate = useNavigate();
    const RedirectOnPersonalInfoPage = () => {
        navigate('/personal-info');
    };

    useEffect(() => {
        instance.get('/activity-option/of-admin?adminId=1')
            .then(response => {
                // console.log(response.data);
                setAvailableOptionsList(response.data);                
            })
            .catch( error => {
                console.error('There was an error retrieving the activities array' + error);
            })
    },[]); 

    useEffect(() => {
        // This code will run whenever optionsToBeRendered changes
        console.log("optionsToBeRendered outside function: ", optionsToBeRendered);
        setIsLoading(false);
        console.log(isLoading);
      }, [optionsToBeRendered]);


     const createActivityInfoComponent = (availableOptionsList: ActivityOption[],optionsToBeRendered: OptionToBeRendered[], setOptionsToBeRendered:React.Dispatch<React.SetStateAction<OptionToBeRendered[]>>) => {
        //console.log(availableOptionsList);
        //console.log("timeSplotsResponse: ",timeSlotsResponseList);
        setOptionsToBeRendered([]);
        let newOptions = [];
        newOptions = [...optionsToBeRendered];
        
        for (let i = 0; i < availableOptionsList.length; i++) {
            for(let j = 0; j< timeSlotsResponseList.length; j++) {
                if( availableOptionsList[i].id == timeSlotsResponseList[j].optionId) {
                   newOptions.push({activityOption: availableOptionsList[i], availabilityInfoList: timeSlotsResponseList[j].availabilityInfoList});
                }
            }
        }
        setOptionsToBeRendered(newOptions);
        console.log("optionsToBeRendered in function: ", optionsToBeRendered);
          
         
    }
        return (
            <div className=" flex flex-col items-center w-screen h-screen">
                <div className="fixed flex justify-center h-1/20 shadow-md pb-2">
                    <FilterComponents 
                        onSearchButtonClick={() => createActivityInfoComponent(availableOptionsList, optionsToBeRendered, setOptionsToBeRendered)} 
                        setTimeSlotsResponse={setTimeSlotsResponseList} 
                        selectedPerson={selectedPerson} 
                        setSelectedPerson={setSelectedPerson} 
                        setFormattedDate={setFormattedDate} 
                        setPricePerPerson={setPricePerPerson}/>
                </div>
                <div className="flex flex-col items-center space-y-6 my-24 w-11/12 max-w-screen overflow-y-auto">
                    { 
                        
                        optionsToBeRendered.map((option, index) => {
                            console.log(option.availabilityInfoList.timeslots);
                            return(
                            <ActivityOptionInfo 
                                key={index} 
                                activity={option.activityOption} 
                                userInputArgs={{selectedPerson: selectedPerson as number, selectedDate: formattedDate}}
                                pricePerPerson={option.availabilityInfoList.pricePerPerson}
                                timeSlot={option.availabilityInfoList.timeslots}
                            />
                        )})
                    }
                </div>

                <div className=' flex mb-0 w-screen shadow-md justify-center fixed bottom-0'
                style={{boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                    <Button type="submit" className="bg-customGreen text-white my-4 " onClick={RedirectOnPersonalInfoPage}>Checkout</Button>
                </div>
                   
    
            </div>
    
        );
}

export default BookingEngine;