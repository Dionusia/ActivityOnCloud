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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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

const ActivityDescription: React.FC<ActivityDescriptionProp> = ({ text, duration, price, numberOfPeople }) => {
    //check if any of the duration values are not 0 and add them to the string
    const durationString = `${duration.durationDays ? `${duration.durationDays}d ` : ''}
                            ${duration.durationHours ? `${duration.durationHours}h ` : ''}
                            ${duration.durationMinutes ? `${duration.durationMinutes}m` : ''}`;
    return (
        <div className="max-w-3/5 items-center ">
            <p className={'text-black text-lg  max-h-40 break-words overflow-auto'}>
                {text}
            </p>
            <br/>
            <div className={'text-black text-15 '}>
                <p>
                    {`Activity Duration: ${durationString}`}
                </p>
                <p>
                    {`${numberOfPeople} adults \u00D7 ${price}€` /*unicode for multiplication sign*/}   
                    <br/>
                    <p className="font-semibold">Total Price:  {price * numberOfPeople}€</p>
                </p>
            </div>
        </div>
    )
}

const TimePicker: React.FC<TimePickerProp> = ({ timeList, selectedTime, setSelectedTime }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
            // setSelectedTime(timeList[currentIndex - 1]);
        }
    }
    const handleNext = () => {
        if(currentIndex < timeList.length - 3){
            setCurrentIndex(currentIndex + 1);
            // setSelectedTime(timeList[currentIndex + 1]);
        }
    }
    return(
        <div className="flex max-w-4/5 space-x-2">
            <button onClick={handlePrev} className="rounded hover:bg-black-400">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="flex space-x-2">
                {timeList.slice(currentIndex, currentIndex + 3).map((time, index) => (
                    <div 
                        key={index} 
                        className={`p-1 border-2 border-black rounded-xl hover:cursor-pointer hover:bg-gray-300 ${time === selectedTime ? 'bg-gray-300' : ''}`}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </div>
                ))} 
            </div>
            <button onClick={handleNext} className="rounded">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
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
        <div className="items-center space-y-4 bg-gray-100 p-4 rounded-lg inline-block w-full">
            <div className={'flex items-center space-x-2'}>
                <div className={'flex flex-col space-y-2 w-full items-center'}>
                    <ActivityTitle text={activity.name} />
                    <ActivityDescription 
                        text= {activity.description} 
                        duration={
                                {
                                    durationDays: activity.durationDays,
                                    durationHours: activity.durationHours,
                                    durationMinutes: activity.durationMinutes
                                } } 
                        price={activity.pricePerPerson} 
                        numberOfPeople={userInputArgs.selectedPerson} />
                    <div className="w-full flex flex-col items-center">
                        <h1 className=" font-medium text-lg text-center">Available Times</h1>
                        <TimePicker timeList={timeList} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityInfoParent;