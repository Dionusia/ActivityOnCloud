import React, { useState } from "react";
import DatePicker from "./DatePick";
import PersonPicker from "./PersonPicker";
import SearchButton from "./SearchButton";
import instance from "../AxiosConfig";
import { TimeSlot, TimeSlots } from "../Pages/BookingEngine";

interface FilterComponentsProps {
  setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlots>>;
  selectedPerson: number | null;
  setSelectedPerson: React.Dispatch<React.SetStateAction<number | null>>;
  setFormattedDate: React.Dispatch<React.SetStateAction<string>>;
}


const FilterComponents: React.FC<FilterComponentsProps> = ({setTimeSlots, selectedPerson ,setSelectedPerson, setFormattedDate}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  let formattedTempDate = "test";

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handlePersonChange = (num: number | null) => {
    setSelectedPerson(num);
  };
  const handleSearch = () => {
    
    if (selectedDate && selectedPerson) {
      console.log("Selected Date:", selectedDate);
      console.log("Number of People:", selectedPerson);
    } else {
      console.log("Please select date and enter number of people");
    }
    if( selectedDate === null || selectedPerson === null){ 
      console.log("Please select date and enter number of people"); return;
    }
    else{
      let offset = selectedDate.getTimezoneOffset();
      let adjustedDate = new Date(selectedDate.getTime() - (offset*60*1000));
      setFormattedDate(adjustedDate.toISOString().split('T')[0]);
      formattedTempDate = adjustedDate.toISOString().split('T')[0];
      console.log("Formatted Date:", formattedTempDate);
    }
    instance.get("/availability/available", {
        params: {
          date: formattedTempDate,
          people: selectedPerson,
        },
      })
      .then((response) => {
        console.log("Time slots:", response.data); 
        const modifiedResponseData = Object.keys(response.data).reduce((acc, key) => {
          acc[key] = response.data[key].map((timeSlot: TimeSlot) => ({
            ...timeSlot,
            start: timeSlot.start.split('T')[1],
            end: timeSlot.end.split('T')[1],
          }));
          return acc;
        }, {} as TimeSlots);
      
        setTimeSlots(modifiedResponseData);        
      })
      .catch((error) => {
        console.log(error + ": Get time slots error");
      });
  };
  return (
    <form className="flex flex-col items-center justify-center mt-8">
      <div className="flex space-x-4 mr-3 ml-3">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        {/* TODO check remaining persons whenever the no of people is incremented through the person picker */}
        <PersonPicker
          onPersonChange={handlePersonChange}
          selectedPerson={selectedPerson} // Pass numberOfPeople instead of selectedPerson
        />
        <SearchButton onSearch={handleSearch} />
      </div>
    </form>
  );
};

export default FilterComponents;
