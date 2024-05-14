import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { DatePickProps } from "../InterfacesAndTypes/Interfaces";

const DatePick: React.FC<DatePickProps> = ({ onDateChange, selectedDate }) => {
 
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <div className="relative flex">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-customGreen focus:border-customGreen block w-full pl-8 p-2.5"
        popperClassName=" rounded-lg shadow-lg bg-white"
        placeholderText="Select date"
        dateFormat='dd-MM-yyyy'
        popperPlacement="bottom-end"
        required
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <FaCalendarAlt color="#049bb1" />
      </div>
    </div>
  );
};

export default DatePick;
