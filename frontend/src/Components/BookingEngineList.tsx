import React, { useEffect } from 'react';
import ActivityOptionInfo from './ActivityOptionInfo';
import {  OptionToBeRendered,BookingEngineListProps } from '../InterfacesAndTypes/Interfaces';




const BookingEngineList: React.FC<BookingEngineListProps> = ({ optionsToBeRendered, selectedCard, setSelectedCard, selectedPerson, formattedDate }) => {
    
    return (
    <div className="flex flex-col items-center space-y-6 my-24 w-screen overflow-y-auto px-6">
      {optionsToBeRendered.map((option, index) => {
        return (
          <div
            key={index}
            onClick={() => setSelectedCard(index)}
            className={index == selectedCard ? 'rounded-lg border-[3px] border-gray-700' : ''}
          >
            <ActivityOptionInfo
              activity={option.activityOption}
              userInputArgs={{ selectedPerson: selectedPerson as number, selectedDate: formattedDate }}
              pricePerPerson={option.availabilityInfoList.pricePerPerson}
              timeSlot={option.availabilityInfoList.timeslots}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BookingEngineList;