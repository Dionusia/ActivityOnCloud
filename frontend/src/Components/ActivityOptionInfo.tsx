import React, { useEffect, useState } from "react";
import '../index.css';
import instance from "../AxiosConfig";
import {   
        ActivityOption,
        ExtendedUserInputArgs, 
        ButtonProp, 
        ActivityOptionTitleProp,
        ActivityOptionDescriptionProp,
        TimePickerProp,
        ActivityOptionInfoParentProps } from "../InterfacesAndTypes/Interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Card } from "flowbite-react";
import ActivityContext from "../ActivityContext";
import { date } from "yup";

const handleBookClick = (activity: ActivityOption, selectedInfoFinal: ExtendedUserInputArgs) => {

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

const ActivityOptionTitle: React.FC<ActivityOptionTitleProp> = ({ text }) => {
    return (
        <h1 className={' text-2xl font-helvetica text-black'}>
            {text}
        </h1>
    )
}

const ActivityOptionDescription: React.FC<ActivityOptionDescriptionProp> = ({ text, price, numberOfPeople }) => {
    return (
        <div className="max-w-3/5 items-center ">
            <p className={'text-black text-lg  max-h-40 break-words overflow-auto'}>
                {text}
            </p>
            <br/>
            <div className={'text-black text-15 font-roboto-slab-extra-light'}>
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
                    <Card 
                        key={index} 
                        className={`p-1 rounded-xl hover:cursor-pointer ${time === selectedTime ? 'border-2 border-black rounded-xl' : ''}`}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </Card>
                ))} 
            </div>
            <button onClick={handleNext} className="rounded">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}
//#endregion

const ActivityOptionInfo: React.FC<ActivityOptionInfoParentProps> = ({activity, timeSlot, userInputArgs, pricePerPerson}) => {
    const startTimes: string[] = [];

    for(let i = 0; i < timeSlot.length; i++){
        const dateTimeParts = timeSlot[i].start.split('T');
        const timeParts = dateTimeParts[1].split(":");
        startTimes.push(`${timeParts[0]}:${timeParts[1]}`);
    }

    
    const [selectedTime, setSelectedTime] = useState(startTimes[0]);
    const activityContext = React.useContext(ActivityContext);
    
    useEffect(() => {
        const selectedInfoFinal: ExtendedUserInputArgs = {  // user selected info and total price for the activity
            selectedPerson: userInputArgs.selectedPerson,
            selectedDate: userInputArgs.selectedDate,
            selectedTime: selectedTime,
            price: pricePerPerson * userInputArgs.selectedPerson,
        };
        console.log("Info: "+ selectedInfoFinal.selectedTime, selectedInfoFinal.price, selectedInfoFinal.selectedPerson, selectedInfoFinal.selectedDate);
        activityContext.setSelectedInfoFinal(selectedInfoFinal);
        
    },[selectedTime, userInputArgs.selectedPerson, userInputArgs.selectedDate, pricePerPerson]);
    return (
        <Card 
        className="hover:shadow-lg"
        //imgAlt="Meaningful alt text for an image that is not purely decorative"
        //imgSrc= {"../Photos/MountainBike.jpeg"}
        >  
            <img
                className="object-cover rounded-t-lg w-full h-[150px]"
                src={activity.imageUrl}
                alt={"Meaningful alt text for an image that is not purely decorative" + activity.imageUrl}
            />   
            <div className="items-center space-y-4 bg-white-100 p-4 rounded-lg inline-block w-full">
                <div className={'flex items-center space-x-2'}>
                    <div className={'flex flex-col space-y-2 w-full items-center'}>
                        <ActivityOptionTitle text={activity.name} />
                        <ActivityOptionDescription
                            text= {activity.description} 
                            price={pricePerPerson} 
                            numberOfPeople={userInputArgs.selectedPerson} />
                        <div className="w-full flex flex-col items-center">
                            <h1 className=" font-roboto-slub-extra-light text-lg text-center">Available Times</h1>
                            <TimePicker timeList={startTimes} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ActivityOptionInfo;