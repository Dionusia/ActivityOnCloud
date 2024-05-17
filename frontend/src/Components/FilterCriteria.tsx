import React, { useState } from "react";
import DatePicker from "./DatePick";
import PersonPicker from "./PersonPicker";
import SearchButton from "./SearchButton";
import instance from "../AxiosConfig";
import { FilterComponentsProps } from "../InterfacesAndTypes/Interfaces";


const FilterComponents: React.FC<FilterComponentsProps> = ({
  setTimeSlotsResponse,
  selectedPerson,
  setSelectedPerson,
  setFormattedDate,

}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  let formattedTempDate = "test";
  

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handlePersonChange = (num: number | null) => {
    setSelectedPerson(num);
  };
  const handleSearch = () => {
    if (!selectedDate && !selectedPerson) {
      setErrorMessage("Please select a person and a date.");
      return;
    } else if (!selectedPerson) {
      setErrorMessage("Please select a person.");
      return;
    } else if (!selectedDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    setErrorMessage("");

    if (selectedDate && selectedPerson) {
      console.log("Selected Date:", selectedDate);
      console.log("Number of People:", selectedPerson);
    } else {
      console.log("Please select date and enter number of people");
    }
    if (selectedDate === null || selectedPerson === null) {
      console.log("Please select date and enter number of people");
      return;
    } else {
      let offset = selectedDate.getTimezoneOffset();
      let adjustedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);
      setFormattedDate(adjustedDate.toISOString().split("T")[0]);
      formattedTempDate = adjustedDate.toISOString().split("T")[0];
      console.log("Formatted Date:", formattedTempDate);
    }

    instance
      .get("/availability/available/1", { //TODO: Change the ActivityId to the actual activityId (In Database as well μονο για εμενα)
        params: {
          date: formattedTempDate,
        },
      })
      .then((response) => {
        console.log("Request response for TimeSlots:", response.data);
        setTimeSlotsResponse(response.data);
      })
      .catch((error) => {
        console.log(error + ": Get time slots error");
      });

  };
  return (
    <form className="flex flex-col items-center justify-center  mt-8">
      <div className="flex space-x-4 items-center mx-5">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} 
          onDateChange={handleDateChange}
        />
        {/* TODO check remaining persons whenever the no of people is incremented through the person picker */}
        <PersonPicker
          onPersonChange={handlePersonChange}
          selectedPerson={selectedPerson } // Pass numberOfPeople instead of selectedPerson
          setSelectedPerson={setSelectedPerson}
        />
        <SearchButton onSearch={handleSearch} />
      </div>
      {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
    </form>
  );
};

export default FilterComponents;
