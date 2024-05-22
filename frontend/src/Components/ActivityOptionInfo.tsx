import React, { useEffect, useState } from "react";
import '../index.css';
import {   
        ExtendedUserInputArgs,  
        ActivityOptionTitleProp,
        ActivityOptionDescriptionProp,
        TimePickerProp,
        ActivityOptionInfoParentProps } from "../InterfacesAndTypes/Interfaces";;
import ActivityContext from "../ActivityContext";
import Carousel from "react-multi-carousel";


//#region child components

const ActivityOptionTitle: React.FC<ActivityOptionTitleProp> = ({ text }) => {
    return (
        <h1 className={' text-2xl font-roboto-slab  text-black'}>
            {text}
        </h1>
    )
}

const ActivityOptionDescription: React.FC<ActivityOptionDescriptionProp> = ({ text, price, numberOfPeople }) => {
    return (
        <div className="max-w-3/5 items-center ">
            <p className={'font-roboto-slab-thin text-lg  max-h-20 break-words overflow-auto'}>
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

const TimePicker: React.FC<TimePickerProp> = ({selectedPersons, timeCapacity, timeList, selectedTime, setSelectedTime }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    //setSelectedTime(null);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3,
        },
      };


    // Convert the values to numbers
    const capacity = timeCapacity.map(value => parseInt(value));
  
    return(
        <div className=" relative p-2 overflow-hidden w-[270px] h-[85px] pb-4" >
            <Carousel responsive={responsive} className="py-2 items-center" showDots={true} arrows={false} renderDotsOutside={true} >
            {timeList.map((time, index) => {
                const isDisabled = capacity[index] < selectedPersons;
                return (
                    <div
                        key={index} 
                        className={`h-[40px] mx-1 p-1 shadow-md rounded-xl hover:cursor-pointer ${time === selectedTime && !isDisabled ? 'border-2 border-black rounded-xl' : ''} ${isDisabled ? 'bg-gray-300 text-white' : ''}`}
                        onClick={isDisabled ? undefined : () => setSelectedTime(time)}
                    >
                        <div className="justify-center text-center">
                            {time}
                        </div>
                        
                    </div>
                );
            })} 
            </Carousel>
        </div>
    )
}
//#endregion

const ActivityOptionInfo: React.FC<ActivityOptionInfoParentProps> = ({activity, timeSlot, userInputArgs, pricePerPerson}) => {
    const startTimes: string[] = [];
    //console.log("Option TimeSlot: ", timeSlot[0].remainingCapacity)
    const timeCapacity: string[] = [];

    for(let i = 0; i < timeSlot.length; i++){
        const dateTimeParts = timeSlot[i].start.split('T');
        const timeParts = dateTimeParts[1].split(":");
        startTimes.push(`${timeParts[0]}:${timeParts[1]}`);
        timeCapacity.push(timeSlot[i].remainingCapacity);
    }

    
    const [selectedTime, setSelectedTime] = useState("");
    const activityContext = React.useContext(ActivityContext);
    
    useEffect(() => {
        const selectedInfoFinal: ExtendedUserInputArgs = {  // user selected info and total price for the activity
            selectedPerson: userInputArgs.selectedPerson,
            selectedDate: userInputArgs.selectedDate,
            selectedTime: selectedTime,
            price: pricePerPerson * userInputArgs.selectedPerson,
        };
        console.log("Selected Card Info: "+ selectedInfoFinal.selectedTime, selectedInfoFinal.price, selectedInfoFinal.selectedPerson, selectedInfoFinal.selectedDate);
        activityContext.setSelectedInfoFinal(selectedInfoFinal);
        
    },[selectedTime, userInputArgs.selectedPerson, userInputArgs.selectedDate, pricePerPerson]);
    return (
        <div 
        className=" shadow-md border-s rounded-lg hover:shadow-lg w-[300px]"
        >  
            <img
                className=" content-centerer object-cover rounded-t-lg w-full h-[150px]"
                src={`Photos/${activity.imageUrl}`}
                alt={`Photos/${activity.imageUrl}`}
            />   
            <div className="items-center space-y-4 bg-white-100 p-4 rounded-lg inline-block w-full">
                <div className={'flex items-center space-x-2'}>
                    <div className={'flex flex-col space-y-1 w-full items-center'}>
                        <ActivityOptionTitle text={activity.name} />
                        <ActivityOptionDescription
                            text= {activity.description} 
                            price={pricePerPerson} 
                            numberOfPeople={userInputArgs.selectedPerson} />
                        <div className="w-full flex flex-col items-center">
                            <h1 className=" font-roboto-slub-extra-light text-lg text-center">Available Times</h1>
                            <TimePicker selectedPersons={userInputArgs.selectedPerson}  timeList={startTimes} timeCapacity={timeCapacity} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityOptionInfo;