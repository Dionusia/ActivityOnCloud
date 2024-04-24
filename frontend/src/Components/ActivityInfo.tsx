import React, { useState } from "react";
import '../index.css';

//#region interfaces and types 
interface StringProp {
    text: string;
}

interface ActivityDescriptionProp {
    text: string;
    duration: Duration;
    price: string;
}

interface TimePickerProp{
    timeList: string[];
}

type TimeSlot = {
    start: string;
    end: string;
}

type Duration = {
    durationDays: number;
    durationHours: number;
    durationMinutes: number;
}

interface ActivityInfoParentProps {
    title: string;
    description: string;
    price: string;
    timeSlot: TimeSlot[];
    duration: Duration;
}
//#endregion

//#region child components
const Button: React.FC<StringProp> = ({ text}) => {
    return (
        <button 
            // onClick={}
            className={"px-6 py-2.5 text-15 text-white rounded-lg font-medium dark:bg-gray-700 hover:bg-gray-600"}
        >
            {text}
        </button>
    )
}

const ActivityTitle: React.FC<StringProp> = ({ text }) => {
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
        <div>
            <p className={'text-black text-lg max-w-sm max-h-40 break-words overflow-auto'}>
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

const TimePicker: React.FC<TimePickerProp> = ({ timeList }) => {
    const [selectedTime, setSelectedTime] = useState(timeList[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <button id="dropdownDefaultButton" onClick={toggleDropdown} data-dropdown-toggle="dropdown" 
                className="text-white 
                        dark:bg-gray-700 
                        hover:bg-gray-600 
                        focus:ring-0       
                        focus:outline-none 
                        focus:ring-blue-300 
                        font-medium rounded-lg text-15
                        px-6 py-2.5 text-center 
                        inline-flex items-center
                        w-44" type="button">
                <div className="flex-grow text-center ">{selectedTime}</div>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" className={`z-10 ${isOpen? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-gray-700 dark:text-white text-15" aria-labelledby="dropdownDefaultButton">
                    {
                        timeList.map((time, index) => (
                            <li key={index} onClick={toggleDropdown}>
                                <a href="#" onClick={() => handleTimeSelect(time)} 
                                className="block px-4 py-2 
                                            hover:bg-gray-100 
                                            dark:hover:bg-gray-600 
                                            dark:hover:text-white 
                                            font-medium
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

const ActivityInfoParent: React.FC<ActivityInfoParentProps> = ({title, description, price, timeSlot, duration }) => {
    const timeList = timeSlot.map(timeSlot => timeSlot.start.slice(0, -3));
    return (
        <div className="items-center 
                        space-y-4 
                        border-2 border-black 
                        bg-blue-200  p-4 
                        rounded-lg inline-block
                        overflow-visible">
            <div className={'flex items-center space-x-2'}>
                <div className={'flex flex-col space-y-2'}>
                    <ActivityTitle text={title} />
                    <ActivityDescription text= {description} duration={duration} price={price} />
                </div>
            </div>
            <div>
                <h1 className=" text-15 font-medium">Available Times</h1>
                <div className={'flex items-center justify-between ml-0'}>
                    <TimePicker timeList={timeList} />
                    <Button text="Book Now" />
                </div>
            </div>
        </div>
    )
}

export default ActivityInfoParent;