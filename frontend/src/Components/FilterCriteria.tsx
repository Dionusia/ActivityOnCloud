import React, { useState } from "react";
import DatePicker from "./DatePick";
import PersonPicker from "./PersonPicker";
import SearchButton from "./SearchButton";
import instance from "../AxiosConfig";

const FilterComponents: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  let formattedDate: string = "";

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
      formattedDate = adjustedDate.toISOString().split('T')[0];
      console.log("Formatted Date:", formattedDate);
    }
    instance
      .get("/availability/available", {
        params: {
          date: formattedDate,
          people: selectedPerson,
        },
      })
      .then((response) => {
        console.log(response.data);
        const availableActivities = response.data;
      })
      .catch((error) => {
        console.log(error + ": Get bookings error");
      });
  };
  return (
    <form className="flex flex-col items-center justify-center mt-8">
      <div className="flex space-x-4 mr-3 ml-3">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
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
