import React, { useState } from "react";
import DatePicker from "./DatePick";
import PersonPicker from "./PersonPicker";
import SearchButton from "./SearchButton";
import instance from "../AxiosConfig";
import { FilterComponentsProps } from "../InterfacesAndTypes/Interfaces";
import { TimeSlots } from "../InterfacesAndTypes/Interfaces";
import { TimeSlot } from "../InterfacesAndTypes/Types";

const FilterComponents: React.FC<FilterComponentsProps> = ({
  setTimeSlots,
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
      .get("/availability/available/1", {
        params: {
          date: formattedTempDate,
          people: selectedPerson,
        },
      })
      .then((response) => {
        console.log("Time slots:", response.data);
        const modifiedResponseData = Object.keys(response.data).reduce(
          (acc, key) => {
            acc[key] = response.data[key].map((timeSlot: TimeSlot) => ({
              ...timeSlot,
              start: timeSlot.start.split("T")[1],
              end: timeSlot.end.split("T")[1],
            }));
            return acc;
          },
          {} as TimeSlots
        );

        setTimeSlots(modifiedResponseData);
      })
      .catch((error) => {
        console.log(error + ": Get time slots error");
      });
  };
  return (
    <form className="flex flex-col items-center justify-center mt-8">
      <div className="flex space-x-4 items-center mx-5">
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
      {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
    </form>
  );
};

export default FilterComponents;
