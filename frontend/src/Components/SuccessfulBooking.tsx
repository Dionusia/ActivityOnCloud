import React, { useContext } from 'react';
import ActivityContext from '../ActivityContext';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const SuccessfulBooking = () => {
    const navigate = useNavigate();
    const activityContext = useContext(ActivityContext);
    console.log("Context Data: ",activityContext.selectedOption  , activityContext.selectedInfoFinal);
    let data;
    let correctTime;

    //τρεχει 2 φορες????
    //add Pm or Am to the time
    if(activityContext.selectedInfoFinal != null && parseInt(activityContext.selectedInfoFinal.selectedTime.split(":")[0]) >= 12) {
        correctTime =  activityContext.selectedInfoFinal.selectedTime.concat(" PM");
    }
    else if(activityContext.selectedInfoFinal != null && parseInt(activityContext.selectedInfoFinal.selectedTime.split(":")[0]) < 12) {
        correctTime =  activityContext.selectedInfoFinal.selectedTime.concat(" AM");
    }


    if(!activityContext.selectedOption && !activityContext.selectedInfoFinal) {
        data = {
            activity: {
                name: "Seaside Surfing (Wrong input from User)",
                price: 200,
                persons: 2
            },
            date: "28 May 2024",
            time: "22:00 PM"
        }
    }
    else {
        data = {
            activity: {
                name: activityContext.selectedOption?.name,
                price: activityContext.selectedInfoFinal?.price,
                persons: activityContext.selectedInfoFinal?.selectedPerson
            },
            date: activityContext.selectedInfoFinal?.selectedDate,
            time: correctTime
        }
    }

    return (
        <div>
            <h1 className='mt-10 text-center text-4xl font-roboto-slab font-bold text-customGreen'>Successful Booking!</h1>
            <div className='flex justify-center'>
                <img 
                className=' m-5 mt-10'
                src="/Photos/success.png" 
                alt="/Photos/success.png" />
            </div>
            <p className='text-center text-2xl font-roboto-slab mb-5 italic text-customHoverGreen'>{data.activity.name}</p>
            <div className='flex justify-center space-x-1 border-y-2'>
                <div className='px-10 py-10 bg-white '>
                    <p className='text-center font-roboto-slab font-bold text-customHoverGreen'>{data.activity.price}$</p>
                    <p className='text-center font-roboto-slab '>{data.activity.persons} Adults</p>
                </div>
                <div className='px-10 py-10 bg-white '>
                <p className='text-center font-roboto-slab font-bold text-customHoverGreen'>{data.date}</p>
                <p className='text-center font-roboto-slab '>{data.time}</p>
                </div>
            </div>
            <div className='my-5 inset-x-0 bottom-8 flex justify-center'>
                <Button 
                className="bg-customGreen text-white px-10 py-2 "
                onClick={() => navigate('/booking-engine')}>Book another Activity</Button>
            </div>
        </div>
    );
};

export default SuccessfulBooking;