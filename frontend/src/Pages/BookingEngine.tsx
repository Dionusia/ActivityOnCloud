import React, { useEffect, useState } from "react";
import FilterComponents from "../Components/FilterCriteria";
import { ActivityOption, OptionToBeRendered, TimeSlotsResponse, } from "../InterfacesAndTypes/Interfaces";
import { Button } from "flowbite-react";
import ActivityContext from "../ActivityContext";
import BookingEngineList from "../Components/BookingEngineList";
import { AvailabilityInfoList } from "../InterfacesAndTypes/Types";

import { useNavigate } from "react-router-dom";


const BookingEngine: React.FC = () => {
    //#region states
    const [availableOptionsList, setAvailableOptionsList] = useState<ActivityOption[]>([]);
    const [timeSlotsResponseList, setTimeSlotsResponseList] = useState<TimeSlotsResponse[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [optionsToBeRendered, setOptionsToBeRendered] = useState<OptionToBeRendered[]>([]);
    const navigate = useNavigate();
    const activityContext = React.useContext(ActivityContext);
    const instance = activityContext.instance;
    //#endregion
    const RedirectOnPersonalInfoPage = () => {
        navigate('/personal-info');
    };
    
    useEffect(() => {
        if(instance !== null) {
            instance.get('/activity-option/of-admin?adminId=52') //CAREFULL hardcoded adminId
                .then(response => {
                    //  console.log(response.data);
                    setAvailableOptionsList(response.data);                
                })
                .catch( error => {
                    console.error('There was an error retrieving the activities array' + error);
                })
            } else {
                console.error('Axios instance is null in BookingEngine.');
            }
        },[instance]); 

    const createActivityInfoComponents = (availableOptionsList: ActivityOption[], setOptionsToBeRendered:React.Dispatch<React.SetStateAction<OptionToBeRendered[]>>) => {
        
        interface NewOption{
            activityOption: ActivityOption;
            availabilityInfoList: AvailabilityInfoList;
        }

        let newOptions: NewOption[] = [];

        
        for (let i = 0; i < availableOptionsList.length; i++) {
            for(let j = 0; j< timeSlotsResponseList.length; j++) {
                if( availableOptionsList[i].id == timeSlotsResponseList[j].optionId) {
                    //check for dubliacte options
                    let existingOption = newOptions.find(option => option.activityOption.id === availableOptionsList[i].id);
                    if(existingOption){
                        existingOption.availabilityInfoList.timeslots.push(...timeSlotsResponseList[j].availabilityInfoList.timeslots);
                    }
                    else{
                        newOptions.push({activityOption: availableOptionsList[i], availabilityInfoList: timeSlotsResponseList[j].availabilityInfoList});
                    }

                }
            }
        }
        console.log("newOptions: ", newOptions);
        setOptionsToBeRendered(newOptions);
    }

    useEffect(() => {
        console.log("optionsToBeRendered: ", optionsToBeRendered);
        createActivityInfoComponents(availableOptionsList,setOptionsToBeRendered);
    }, [timeSlotsResponseList]);

    useEffect(() => {
        if (selectedCard !== null && selectedCard < optionsToBeRendered.length) {
          console.log("Selected Card: ", selectedCard);
          const selectedOption = optionsToBeRendered[selectedCard];
          activityContext.setSelectedOption(selectedOption.activityOption);
        }
    }, [selectedCard, optionsToBeRendered, activityContext]);


    return (
        <div className=" flex flex-col overflow-x-hidden space-y-4"
        style={{height: `${window.innerHeight}px`,width: `${window.innerWidth}px`}}>
            <div className=" flex justify-center h-1/10 shadow-md w-full bg-white ">
                <FilterComponents
                    setTimeSlotsResponse={setTimeSlotsResponseList} 
                    selectedPerson={selectedPerson} 
                    setSelectedPerson={setSelectedPerson} 
                    setFormattedDate={setFormattedDate} 
                    />
            </div >
            <div className="h-8/10 overflow-y-auto">
            <BookingEngineList 
                optionsToBeRendered={optionsToBeRendered} 
                selectedCard={selectedCard} 
                setSelectedCard={setSelectedCard} 
                selectedPerson={selectedPerson as number} 
                formattedDate={formattedDate} 
            /> 
            </div>
            <div className=' flex mb-0 w-full shadow-md justify-center bottom-0 bg-white h-1/10' 
            style={{boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                <Button 
                type="submit" 
                className={`flex items-center justify-center ${selectedCard === null ? "bg-gray-400 text-white my-4 px-4 py-4" : "bg-customGreen text-white my-4 px-4 py-4"}`}
                onClick={RedirectOnPersonalInfoPage}
                disabled={selectedCard === null}>
                    Checkout</Button>
            </div>
                

        </div>

    );
}

export default BookingEngine;