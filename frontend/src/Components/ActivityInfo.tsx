import React, { useState } from "react";
import '../index.css';
import instance from "../AxiosConfig";
import {   
        Activity, 
        ExtendedUserInputArgs, 
        ButtonProp, 
        ActivityTitleProp, 
        ActivityDescriptionProp, 
        TimePickerProp,
        ActivityInfoParentProps } from "../InterfacesAndTypes/Interfaces";


const handleBookClick = (activity: Activity,selectedInfoFinal: ExtendedUserInputArgs) => {

    console.log("Info: "+ selectedInfoFinal.selectedTime, selectedInfoFinal.price, selectedInfoFinal.selectedPerson, selectedInfoFinal.selectedDate);

    instance.post('/booking/new-booking', {
        activityId: activity.id,
        date: selectedInfoFinal.selectedDate,
        startTime: selectedInfoFinal.selectedTime,
        persons: selectedInfoFinal.selectedPerson,
        priceTotal: selectedInfoFinal.price,
        customerName: 'Mike Mpallas',
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//#region child components
const Button: React.FC<ButtonProp> = ({ text, onClick, activity, userInputArgs }) => {
    return (
        <button 
            onClick={() => onClick(activity, userInputArgs)}
            className={"px-6 py-2.5 text-15 text-white rounded-lg font-medium bg-customGreen hover:bg-customHoverGreen"}
        >
            {text}
        </button>
    )
}

const ActivityTitle: React.FC<ActivityTitleProp> = ({ text }) => {
    return (
        <h1 className={'text-2xl font-bold text-black'}>
            {text}
        </h1>
    )
}

const ActivityDescription: React.FC<ActivityDescriptionProp> = ({ text, duration, price }) => {
    //check if any of the duration values are not 0 and add them to the string
    const durationString = `${duration.durationDays ? `${duration.durationDays}d ` : ''}
                            ${duration.durationHours ? `${duration.durationHours}h ` : ''}
                            ${duration.durationMinutes ? `${duration.durationMinutes}m` : ''}`;
    return (
        <div className="max-w-3/5">
            <p className={'text-black text-lg  max-h-40 break-words overflow-auto'}>
                {text}
            </p>
            <br/>
            <div className={'text-black text-15 '}>
                <p>
                    {`Activity Duration: ${durationString}`}
                </p>
                <p>
                    {`Price: ${price}€`}
                </p>
            </div>
        </div>
    )
}

const TimePicker: React.FC<TimePickerProp> = ({ timeList, selectedTime, setSelectedTime }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <button id="dropdownDefaultButton" onClick={toggleDropdown} data-dropdown-toggle="dropdown" 
                className="text-white 
                        bg-customGreen 
                        hover:bg-customHoverGreen 
                        focus:ring-0       
                        focus:outline-none 
                        focus:ring-blue-300 
                        font-medium rounded-lg text-15
                        px-6 py-2.5 text-center 
                        inline-flex items-center
                        w-44" type="button">
                <div className="flex-grow text-center ">{selectedTime}</div>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" className={` ${isOpen? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-gray-700 dark:text-white text-15" aria-labelledby="dropdownDefaultButton">
                    {
                        timeList.map((time, index) => (
                            <li key={index} onClick={toggleDropdown}>
                                <a href="#" onClick={() => setSelectedTime(time)} 
                                className="block px-4 py-2 
                                            font-medium
                                            hover:bg-gray-400
                                            hover:text-white
                                            text-center text-15">{time}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
//#endregion

const ActivityInfoParent: React.FC<ActivityInfoParentProps> = ({activity, timeSlot, userInputArgs }) => {
    const timeList = timeSlot.map(timeSlot => timeSlot.start.slice(0, -3));
    const [selectedTime, setSelectedTime] = useState(timeList[0]);

    const selectedInfoFinal: ExtendedUserInputArgs = {
        selectedPerson: userInputArgs.selectedPerson,
        selectedDate: userInputArgs.selectedDate,
        selectedTime: selectedTime,
        price: activity.pricePerPerson * userInputArgs.selectedPerson,
    };

    return (
        <div className="items-center space-y-4 bg-gray-100 p-4 rounded-lg inline-block ">
            <div className={'flex items-center space-x-2'}>
                <div className={'flex flex-col space-y-2'}>
                    <ActivityTitle text={activity.name} />
                    <ActivityDescription text= {activity.description} duration={
                                {
                                    durationDays: activity.durationDays,
                                    durationHours: activity.durationHours,
                                    durationMinutes: activity.durationMinutes
                                } } price={selectedInfoFinal.price} />
                </div>
            </div>
            <div>
                <h1 className=" text-15 font-medium">Available Times</h1>
                <div className={'flex items-center justify-between ml-0 space-x-4'}>
                    <TimePicker timeList={timeList} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                    <Button text="Book Now" 
                    onClick={handleBookClick}  
                    activity={activity} 
                    userInputArgs={selectedInfoFinal}
                    />
                </div>
            </div>
        </div>
    )
}

export default ActivityInfoParent;