import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityOptionInfo from "../Components/ActivityOptionInfo";
import FilterComponents from "../Components/FilterCriteria";
import instance from "../AxiosConfig";
import { ActivityOption, OptionToBeRendered, TimeSlotsResponse, UserInputArgs, } from "../InterfacesAndTypes/Interfaces";
import { Button } from "flowbite-react";
import ActivityContext from "../ActivityContext";
import BookingEngineList from "../Components/BookingEngineList";


//για καποιο λογο καλειτε 2 φορεσ το component
const BookingEngine: React.FC = () => {
    //#region states
    const [availableOptionsList, setAvailableOptionsList] = useState<ActivityOption[]>([]);
    const [timeSlotsResponseList, setTimeSlotsResponseList] = useState<TimeSlotsResponse[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [optionsToBeRendered, setOptionsToBeRendered] = useState<OptionToBeRendered[]>([]);
    //#endregion
    const activityContext = useContext(ActivityContext);
    const navigate = useNavigate();
    const RedirectOnPersonalInfoPage = () => {
        navigate('/personal-info');
    };

    useEffect(() => {
        instance.get('/activity-option/of-admin?adminId=1')
            .then(response => {
                //  console.log(response.data);
                setAvailableOptionsList(response.data);                
            })
            .catch( error => {
                console.error('There was an error retrieving the activities array' + error);
            })
    },[]); 

    const createActivityInfoComponents = (availableOptionsList: ActivityOption[], setOptionsToBeRendered:React.Dispatch<React.SetStateAction<OptionToBeRendered[]>>) => {
        
        let newOptions = [];
        
        for (let i = 0; i < availableOptionsList.length; i++) {
            for(let j = 0; j< timeSlotsResponseList.length; j++) {
                if( availableOptionsList[i].id == timeSlotsResponseList[j].optionId) {
                    newOptions.push({activityOption: availableOptionsList[i], availabilityInfoList: timeSlotsResponseList[j].availabilityInfoList});
                }
            }
        }
        setOptionsToBeRendered(newOptions);
    }

    useEffect(() => {
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
        <div className=" flex flex-col items-center w-screen h-screen">
            <div className="fixed flex justify-center h-1/20 shadow-md pb-2 w-screen">
                <FilterComponents
                    setTimeSlotsResponse={setTimeSlotsResponseList} 
                    selectedPerson={selectedPerson} 
                    setSelectedPerson={setSelectedPerson} 
                    setFormattedDate={setFormattedDate} 
                    />
            </div>
            <BookingEngineList 
                optionsToBeRendered={optionsToBeRendered} 
                selectedCard={selectedCard} 
                setSelectedCard={setSelectedCard} 
                selectedPerson={selectedPerson as number} 
                formattedDate={formattedDate} 
            /> 

            <div className=' flex mb-0 w-screen shadow-md justify-center fixed bottom-0'
            style={{boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                <Button type="submit" className="bg-customGreen text-white my-4 " onClick={RedirectOnPersonalInfoPage}>Checkout</Button>
            </div>
                

        </div>

    );
}

export default BookingEngine;