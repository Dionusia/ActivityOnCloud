import React, { useState } from "react";
import '../index.css';

interface StringProp {
    text: string;
}

interface TimePickerProp{
    timeList: string[];
}

interface ButtonProps {
    text: string;
}

interface ActivityInfoParentProps {
    timeList: string[];

}

const Button: React.FC<ButtonProps> = ({ text}) => {
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

const ActivityDescription: React.FC<StringProp> = ({ text }) => {
    return (
        <p className={'text-black text-lg max-w-sm max-h-40 overflow-auto break-words'}>
            {text}
        </p>
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

const ActivityInfoParent: React.FC<ActivityInfoParentProps> = ({timeList}) => {
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscingfwewfewe fwgwefewgewgwegwegewgwgwrgwgwrggwrwgwrg elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    return (
        <div className="items-center 
                        space-y-4 
                        border-2 border-black 
                        bg-blue-200  p-4 
                        rounded-lg inline-block
                        overflow-visible">
            <div className={'flex items-center space-x-2'}>
                <div className={'flex flex-col space-y-2'}>
                    <ActivityTitle text="Title" />
                    <ActivityDescription text= {description} />
                </div>
                <ActivityDescription text="Price: 125$" />
            </div>
            <div>
                <h1 className=" text-15 font-medium">Available Times</h1>
                <div className={'flex items-center justify-between ml-0'}>
                    <TimePicker timeList={timeList} />
                    <Button text="Book Now" />
                </div>
            </div>
            {/* <Button text="2:00AM" isPressed={isPressed} handleClick={handleClick}/> */}
        </div>
    )
}

export default ActivityInfoParent;